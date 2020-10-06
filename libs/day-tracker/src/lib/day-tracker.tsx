import React from 'react';
import { WorkTimeClient } from '@myin-work/work-time-client';

import './day-tracker.scss';

/* eslint-disable-next-line */
export interface DayTrackerProps {
  workTimeClient: WorkTimeClient;
}
export interface DayTrackerState {
  newTime: string;
}

export class DayTracker extends React.Component<
  DayTrackerProps,
  DayTrackerState
> {
  constructor(props: DayTrackerProps) {
    super(props);
    this.state = {
      newTime: '',
    };
  }

  updateNewTime(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;

    this.setState({
      newTime: value,
    });
  }

  createNewTime() {
    const time = this.state.newTime.split(':').map((x) => parseInt(x));
    if (time.length == 2) {
      const today = new Date();
      today.setHours(time[0]);
      today.setMinutes(time[1]);
      today.setSeconds(0);
      today.setMilliseconds(0);

      this.props.workTimeClient.createWorkTime({
        timestamp: today.toISOString(),
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to day-tracker!</h1>
        <input type="time" onChange={this.updateNewTime.bind(this)} />
        <button onClick={this.createNewTime.bind(this)}>Add time</button>
      </div>
    );
  }
}
