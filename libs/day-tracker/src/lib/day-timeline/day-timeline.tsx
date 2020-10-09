import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import './day-timeline.scss';
import { TimeSegment } from '@myin-work/cloud-shared';

/* eslint-disable-next-line */
export interface DayTimelineProps {
  timeSegments: TimeSegment[];
  editTimeline: (time: TimeSegment, i: number) => void;
}

export class DayTimeline extends React.Component<DayTimelineProps> {
  private createTimelineItem(time: TimeSegment, index: number) {
    return (
      <div onClick={(e) => this.props.editTimeline(time, index)}>
        <TimelineItem key={index}>
          <TimelineOppositeContent>{time.time}</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{time.name}</TimelineContent>
        </TimelineItem>
      </div>
    );
  }

  render() {
    return (
      <Timeline>
        {this.props.timeSegments.map((t, i) => this.createTimelineItem(t, i))}
      </Timeline>
    );
  }
}
