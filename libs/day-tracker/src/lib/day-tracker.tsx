import React from 'react';
import { WorkTimeClient } from '@myin-work/work-time-client';

import './day-tracker.scss';
import { TimeSegment } from '@myin-work/cloud-shared';
import { DayTimeline } from './day-timeline/day-timeline';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

/* eslint-disable-next-line */
export interface DayTrackerProps {
  workTimeClient: WorkTimeClient;
}
export interface DayTrackerState {
  newTime: string;
  name: string;
  comment: string;
  times: TimeSegment[];
}

export class DayTracker extends React.Component<
  DayTrackerProps,
  DayTrackerState
> {
  constructor(props: DayTrackerProps) {
    super(props);
    this.state = {
      newTime: '',
      name: '',
      comment: '',
      times: [],
    };
  }

  updateNewTime(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    this.setState({ newTime: value });
  }

  updateName(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    this.setState({ name: value });
  }

  updateComment(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    this.setState({ comment: value });
  }

  addTime() {
    if (this.state.newTime != null) {
      const time: TimeSegment = {
        time: this.state.newTime,
        name: this.state.name,
        comment: this.state.comment,
      };
      this.setState((s) => ({
        ...s,
        times: [...s.times, time],
      }));
    }
  }

  saveTime() {
    const today = new Date();
    this.props.workTimeClient.createWorkTime({
      dayId: today.toISOString(),
      times: this.state.times,
    });
  }

  render() {
    return (
      <Box display="flex" flexDirection="row">
        <DayTimeline timeSegments={this.state.times} />
        <Box display="flex" flexDirection="column">
          <TextField type="time" onChange={this.updateNewTime.bind(this)} />
          <TextField onChange={this.updateName.bind(this)} />
          <TextField onChange={this.updateComment.bind(this)} />
          <div>
            <IconButton color="primary" onClick={this.addTime.bind(this)}>
              <Icon>add</Icon>
            </IconButton>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.saveTime.bind(this)}
          >
            Save
          </Button>
        </Box>
      </Box>
    );
  }
}
