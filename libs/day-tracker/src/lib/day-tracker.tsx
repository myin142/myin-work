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

export interface DayTrackerProps {
  workTimeClient: WorkTimeClient;
}
export interface DayTrackerState {
  selectedTimeId: string;
  selectedTime: TimeSegment;
  times: TimeSegment[];
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
      times: [],
    };
  }

  private get calendar(): CalendarApi {
    return this.calendarRef.current.getApi();
  }

  private handleDateSet(e: DatesSetArg) {
    this.reloadTimesForDay(DateTime.fromJSDate(e.start).toISODate());
  }

  private reloadTimesForDay(day: string) {
    this.calendarSource(day).then((ev) => {
      this.calendar.removeAllEvents();
      ev.forEach((e) => this.calendar.addEvent(e));
    });
  }

  private async calendarSource(day: string): Promise<EventInput[]> {
    const times = await this.fetchTimesForDate(day);
    return times.map((t, i) => ({
      id: `${i}`,
      ...this.toCalendarEvent(t),
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

  private toTimeString(date: Date): string {
    if (date == null) return '';
    return DateTime.fromJSDate(date).toFormat('HH:mm');
  }

  private fromTimeString(time: string): Date {
    if (time == null) return null;
    return DateTime.fromFormat(time, 'HH:mm').toJSDate();
  }

  private toCalendarEvent(time: TimeSegment): EventInput {
    return {
      start: this.fromTimeString(time.start),
      end: this.fromTimeString(time.end),
      title: time.name,
    };
  }

  private fromCalendarEvent(ev: EventApi): TimeSegment {
    return {
      start: this.toTimeString(ev.start),
      end: this.toTimeString(ev.end),
      name: ev.title,
    };
  }

  private handleDateSelect(selectInfo: DateSelectArg) {
    this.setState({
      selectedTime: {
        start: this.toTimeString(selectInfo.start),
      },
    });
  }

  private handleEventClick(ev: EventClickArg) {
    console.log(ev);
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
    this.getSelectedEvent().setProp('title', time.name);
  }

  private deleteTime() {
    if (this.state.selectedTimeId != null) {
      this.getSelectedEvent().remove();
    }
  }

  private saveTime() {
    const today = new Date();
    this.props.workTimeClient.createWorkTime({
      dayId: today.toISOString(),
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
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay',
          }}
          footerToolbar={{
            left: 'save',
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
