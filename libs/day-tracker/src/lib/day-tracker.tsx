import { WorkTimeClient } from '@myin-work/work-time-client';
import { DateTime } from 'luxon';
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
import { TimeSegment } from '@myin-work/cloud-shared';
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
}

export class DayTracker extends React.Component<
  DayTrackerProps,
  DayTrackerState
> {
  private calendarRef: RefObject<FullCalendar> = React.createRef();

  constructor(props: DayTrackerProps) {
    super(props);
    this.state = {
      selectedTimeId: null,
      selectedTime: null,
      showSummary: false,
      times: [],
    };
  }

  private get calendar(): CalendarApi {
    return this.calendarRef.current.getApi();
  }

  private get currentDate(): Date {
    return this.calendar.getDate();
  }

  private handleDateSet(e: DatesSetArg) {
    this.reloadTimesForDay(e.start);
  }

  private reloadTimesForDay(date: Date) {
    var dateTime = DateTime.fromJSDate(date);
    this.calendarSource(dateTime.toISODate(), date).then((ev) => {
      this.calendar.removeAllEvents();
      ev.forEach((e) => this.calendar.addEvent(e));
    });
  }

  private async calendarSource(day: string, date: Date): Promise<EventInput[]> {
    const times = await this.fetchTimesForDate(day);
    console.log(times);
    return times.map((t, i) => ({
      id: `${i}`,
      ...this.toCalendarEvent(t, date),
    }));
  }

  private async fetchTimesForDate(date: string): Promise<TimeSegment[]> {
    try {
      const workTime = await this.props.workTimeClient.getTimeOfDay(date);
      if (workTime && workTime.length > 0) {
        return workTime[0].times;
      }
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

  private saveTime() {
    const date = DateTime.fromJSDate(this.currentDate).toISODate();
    this.props.workTimeClient.createWorkTime({
      dayId: date,
      times: this.state.times,
    });
  }

  private getSelectedEvent(): EventApi {
    const cal: CalendarApi = this.calendarRef.current.getApi();
    return cal.getEventById(this.state.selectedTimeId);
  }

  render() {
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
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay',
          }}
          footerToolbar={{
            left: 'save',
            right: 'summary',
          }}
          initialView="timeGridDay"
          editable={true}
          selectable={true}
          allDaySlot={false}
          weekends={false}
          select={this.handleDateSelect.bind(this)}
          eventsSet={this.handleEvents.bind(this)}
          eventClick={this.handleEventClick.bind(this)}
          datesSet={this.handleDateSet.bind(this)}
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
