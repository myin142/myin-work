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

export interface DayTrackerProps {
  workTimeClient: WorkTimeClient;
}
export interface DayTrackerState {
  newTime: string;
  name: string;
  comment: string;
  times: TimeSegment[];
  editIndex: number;
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
      editIndex: -1,
    };
  }

  private updateNewTime(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    this.setState({ newTime: value });
  }

  private updateName(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    this.setState({ name: value });
  }

  private updateComment(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    this.setState({ comment: value });
  }

  private addTime() {
    if (this.state.newTime !== '') {
      console.log(this.state.newTime);

      const time: TimeSegment = this.createTimeFromState();

      if (this.state.editIndex !== -1) {
        this.setState((s) => {
          s.times[this.state.editIndex] = time;
          return s;
        });
      } else {
        this.setState((s) => ({
          ...s,
          times: [...s.times, time],
        }));
      }

      this.clearTimeState();
    }
  }

  private createTimeFromState(): TimeSegment {
    return {
      time: this.state.newTime,
      name: this.state.name,
      comment: this.state.comment,
    };
  }

  private clearTimeState(): void {
    this.setState({
      name: '',
      newTime: '',
      comment: '',
      editIndex: -1,
    });
  }

  private saveTime() {
    const today = new Date();
    this.props.workTimeClient.createWorkTime({
      dayId: today.toISOString(),
      times: this.state.times,
    });
  }

  private editTime({ time, comment, name }: TimeSegment, index: number) {
    this.setState({
      comment,
      name,
      newTime: time,
      editIndex: index,
    });
  }

  private deleteTime() {
    this.setState((s) => ({
      times: s.times.filter((v, i) => i !== this.state.editIndex),
    }));
    this.clearTimeState();
  }

  render() {
    return (
      <Box display="flex" flexDirection="row">
        <DayTimeline
          timeSegments={this.state.times}
          editTimeline={this.editTime.bind(this)}
        />
        <Box display="flex" flexDirection="column" flexGrow="1">
          <TextField
            type="time"
            value={this.state.newTime}
            onChange={this.updateNewTime.bind(this)}
          />
          <TextField
            value={this.state.name}
            onChange={this.updateName.bind(this)}
          />
          <TextField
            value={this.state.comment}
            onChange={this.updateComment.bind(this)}
          />
          <Box display="flex" flexDirection="row">
            <IconButton color="primary" onClick={this.addTime.bind(this)}>
              <Icon>{this.state.editIndex === -1 ? 'add' : 'save'}</Icon>
            </IconButton>
            {this.state.editIndex !== -1 && (
              <>
                <IconButton
                  color="primary"
                  onClick={this.clearTimeState.bind(this)}
                >
                  <Icon>clear</Icon>
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={this.deleteTime.bind(this)}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </>
            )}
          </Box>
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
