import { WorkTimeClient } from '@myin-work/work-time-client';
import { Redirect } from 'react-router-dom';
import { DateTime, Interval } from 'luxon';
import React, { RefObject } from 'react';
import FullCalendar, {
  CalendarApi,
  DateSelectArg,
  DatesSetArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './day-tracker.scss';
import { TimeSegment, WorkTime } from '@myin-work/cloud-shared';
import DayTimeDialog from './day-time-dialog/day-time-dialog';
import DaySummary from './day-summary/day-summary';
import { TimeUtils } from '@myin-work/time-utils';

export interface DayTrackerProps {
  workTimeClient: WorkTimeClient;
}
export interface DayTrackerState {
  selectedTimeId: string;
  selectedTime: TimeSegment;
  times: TimeSegment[];
  showSummary: boolean;
  dirty: boolean;
  redirect: string;
}

interface Holiday {
  name: string;
  date: string;
  type?: string;
}

export class DayTracker extends React.Component<
  DayTrackerProps,
  DayTrackerState
> {
  private static HOLIDAY_KEY = 'myin-work-holidays';
  private static HOLIDAY_YEAR_KEY = 'myin-work-holidays-year';

  private calendarRef: RefObject<FullCalendar> = React.createRef();

  constructor(props: DayTrackerProps) {
    super(props);
    this.state = {
      selectedTimeId: null,
      selectedTime: null,
      showSummary: false,
      times: [],
      dirty: false,
      redirect: null,
    };
  }

  private async loadHolidays() {
    const currentYear = DateTime.fromJSDate(new Date()).year;
    const savedYear = parseInt(
      localStorage.getItem(DayTracker.HOLIDAY_YEAR_KEY)
    );
    if (currentYear != savedYear) {
      const response = await fetch(
        `https://holidays.abstractapi.com/v1/?api_key=50b53820a2154b05b2b0d977080fd472&country=AT&year=${currentYear}`
      );

      const data: Holiday[] = await response.json();
      const compactData: Holiday[] = data
        .filter((d) => d.type === 'National')
        .map((d) => ({ name: d.name, date: d.date }));

      localStorage.setItem(DayTracker.HOLIDAY_KEY, JSON.stringify(compactData));
      localStorage.setItem(DayTracker.HOLIDAY_YEAR_KEY, `${currentYear}`);
    }
  }

  private getHolidayEvents(interval: Interval): EventInput[] {
    const format = 'MM/dd/yyyy';
    this.loadHolidays();
    return this.holidays
      .filter((h) => {
        const date = DateTime.fromFormat(h.date, format);
        return interval.contains(date);
      })
      .map((h) => ({
        allDay: true,
        title: h.name,
        date: DateTime.fromFormat(h.date, format).toJSDate(),
        color: '#33DD33',
      }));
  }

  private get holidays(): Holiday[] {
    return JSON.parse(localStorage.getItem(DayTracker.HOLIDAY_KEY));
  }

  private get calendar(): CalendarApi {
    return this.calendarRef.current.getApi();
  }

  private get currentDate(): Date {
    return this.calendar.getDate();
  }

  private handleDateSet(e: DatesSetArg) {
    this.reloadTimesForDay([e.start, e.end]);
  }

  private async reloadTimesForDay(dates: Date[]) {
    // Currently only support 2 items
    const interval = Interval.fromDateTimes(dates[0], dates[1]);
    const ev = await this.calendarSource(dates);
    const holidays = this.getHolidayEvents(interval);
    ev.push(...holidays);
    ev;

    this.calendar.removeAllEvents();
    ev.forEach((e) => this.calendar.addEvent(e));

    this.setState({
      dirty: false,
    });
  }

  private async calendarSource(dates: Date[]): Promise<EventInput[]> {
    var dateStr = dates.map((d) => DateTime.fromJSDate(d).toISODate());
    const workTime = await this.fetchTimesForDate(dateStr);
    return workTime
      .map((work, i) => {
        return work.times.map((t) => ({
          id: `${i}`,
          ...this.toCalendarEvent(t, DateTime.fromISO(work.dayId).toJSDate()),
        }));
      })
      .reduce((a1, a2) => [...a1, ...a2], []);
  }

  private async fetchTimesForDate(dates: string[]): Promise<WorkTime[]> {
    try {
      const workTime = await this.props.workTimeClient.getTimeOfDay(dates);
      return workTime || [];
    } catch (e) {}
    return [];
  }

  private toCalendarEvent(
    time: TimeSegment,
    date = this.currentDate
  ): EventInput {
    return {
      start: TimeUtils.timeToDate(time.start, date),
      end: TimeUtils.getEndDate(time, date),
      title: time.name,
      color: time.break ? 'rgb(220, 0, 78)' : '',
      extendedProps: {
        break: time.break,
        comment: time.comment,
      },
    };
  }

  private fromCalendarEvent(ev: EventApi): TimeSegment {
    return {
      start: TimeUtils.dateToTime(ev.start),
      end: TimeUtils.dateToTime(ev.end),
      name: ev.title,
      break: ev.extendedProps.break,
      comment: ev.extendedProps.comment,
    };
  }

  private handleDateSelect(selectInfo: DateSelectArg) {
    this.setState({
      selectedTime: {
        start: TimeUtils.dateToTime(selectInfo.start),
      },
    });
  }

  private handleEventClick(ev: EventClickArg) {
    this.setState({
      selectedTimeId: ev.event.id,
      selectedTime: this.fromCalendarEvent(ev.event),
    });
  }

  private handleEvents(ev: EventApi[]) {
    this.setState({
      dirty: true,
      times: ev.map((e) => this.fromCalendarEvent(e)),
    });
  }

  private onDialogClose(time: TimeSegment) {
    this.addTime(time);
    this.editTime(time);

    this.calendarRef.current.getApi().unselect();
    this.setState({
      selectedTimeId: null,
      selectedTime: null,
    });
  }

  private addTime(time: TimeSegment) {
    if (time == null || this.state.selectedTimeId != null) return;
    const cal: CalendarApi = this.calendarRef.current.getApi();
    cal.addEvent({
      id: `${this.state.times.length}`,
      ...this.toCalendarEvent(time),
    });
  }

  private editTime(time: TimeSegment) {
    if (time == null || this.state.selectedTimeId == null) return;
    const calendarEv = this.toCalendarEvent(time);
    const ev = this.getSelectedEvent();
    ev.setProp('title', calendarEv.title);
    ev.setExtendedProp('comment', calendarEv.extendedProps.comment);
    ev.setExtendedProp('break', calendarEv.extendedProps.break);
    ev.setProp('color', calendarEv.color);
  }

  private deleteTime() {
    if (this.state.selectedTimeId != null) {
      this.getSelectedEvent().remove();
    }
  }

  private async saveTime() {
    const date = DateTime.fromJSDate(this.currentDate).toISODate();
    try {
      await this.props.workTimeClient.createWorkTime({
        dayId: date,
        times: this.state.times,
      });
      this.setState({
        dirty: false,
      });
    } catch (e) {
      console.log('Failed to save work times. Try again later.');
    }
  }

  private getSelectedEvent(): EventApi {
    const cal: CalendarApi = this.calendarRef.current.getApi();
    return cal.getEventById(this.state.selectedTimeId);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="calendar">
        <FullCalendar
          ref={this.calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          customButtons={{
            save: {
              text: 'Save',
              click: () => this.saveTime(),
            },
            summary: {
              text: 'Summary',
              click: () => this.setState({ showSummary: true }),
            },
            export: {
              text: 'Export',
              click: () => this.setState({ redirect: 'export' }),
            },
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay',
          }}
          footerToolbar={{
            left: this.state.dirty ? 'save' : '',
            right: 'export summary',
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          select={this.handleDateSelect.bind(this)}
          eventsSet={this.handleEvents.bind(this)}
          eventClick={this.handleEventClick.bind(this)}
          datesSet={this.handleDateSet.bind(this)}
          slotDuration="00:15:00"
          slotMinTime="07:00:00"
          slotMaxTime="19:00:00"
        />
        <DaySummary
          timeSegments={this.state.times}
          show={this.state.showSummary}
          onClose={() => this.setState({ showSummary: false })}
        />
        <DayTimeDialog
          time={this.state.selectedTime}
          edit={this.state.selectedTimeId != null}
          onDelete={this.deleteTime.bind(this)}
          onDialogClose={this.onDialogClose.bind(this)}
        />
      </div>
    );
  }
}
