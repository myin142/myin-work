import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

import './day-timeline.scss';
import { TimeSegment } from '@myin-work/cloud-shared';

/* eslint-disable-next-line */
export interface DayTimelineProps {
  timeSegments: TimeSegment[];
}

const createTimelineItem = (time: TimeSegment, index: number) => {
  return (
    <TimelineItem key={index}>
      <TimelineOppositeContent>{time.time}</TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{time.name}</TimelineContent>
    </TimelineItem>
  );
};

export const DayTimeline = (props: DayTimelineProps) => {
  return <Timeline>{props.timeSegments.map(createTimelineItem)}</Timeline>;
};
