import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { TimeSegment } from '@myin-work/cloud-shared';
import React from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import './day-summary.scss';
import { TimeUtils } from '@myin-work/time-utils';

export interface DaySummaryProps {
  timeSegments: TimeSegment[];
  show: boolean;
  onClose?: () => void;
}

function findOverlappingIntersections(
  time: TimeSegment,
  times: TimeSegment[]
): Interval[] {
  const interval = getInterval(time);
  return times
    .filter((t) => t.name !== time.name)
    .map((t) => getInterval(t))
    .filter((i) => i.isAfter(interval.start))
    .map((i) => interval.intersection(i))
    .filter((i) => !!i);
}

function getInterval(time: TimeSegment): Interval {
  const start = DateTime.fromISO(time.start);
  const end = TimeUtils.getEndDate(time);
  return Interval.fromDateTimes(start, end);
}

function getDuration(time: TimeSegment): Duration {
  const date = DateTime.fromISO(time.start);
  const endDate = TimeUtils.getEndDate(time);
  return DateTime.fromJSDate(endDate).diff(date);
}

export const DaySummary = (props: DaySummaryProps) => {
  const summary: { [k: string]: Duration } = {};

  for (const time of props.timeSegments) {
    let duration = getDuration(time);

    findOverlappingIntersections(time, props.timeSegments).forEach((i) => {
      duration = duration.minus(i.toDuration());
    });

    if (summary[time.name]) {
      summary[time.name] = summary[time.name].plus(duration);
    } else {
      summary[time.name] = duration;
    }
  }

  const items = Object.keys(summary).map((n, i) => {
    return (
      <ListItem key={i}>
        <ListItemText>
          {n} - {summary[n].toFormat('hh:mm')}
        </ListItemText>
      </ListItem>
    );
  });

  const total = Object.keys(summary)
    .map((n) => summary[n])
    .reduce((d1, d2) => d1.plus(d2), Duration.fromMillis(0));

  const totalItem =
    items.length > 0 ? (
      <ListItem>Total - {total.toFormat('hh:mm')}</ListItem>
    ) : (
      <></>
    );

  if (items.length === 0) {
    items.push(<ListItem key={0}>No Times</ListItem>);
  }

  return (
    <Dialog open={props.show} onClose={props.onClose}>
      <DialogTitle>Summary of today</DialogTitle>
      <List>
        {items}
        {totalItem}
      </List>
    </Dialog>
  );
};

export default DaySummary;
