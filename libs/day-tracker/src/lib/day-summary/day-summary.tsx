import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
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
    .filter((i) => i.isAfter(interval.start) || interval.engulfs(i))
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

function createListItem(times: { [k: string]: Duration }) {
  return Object.keys(times).map((n, i) => {
    return (
      <ListItem key={n}>
        <ListItemText>
          {n} - {times[n].toFormat('hh:mm')}
        </ListItemText>
      </ListItem>
    );
  });
}

function sumOfDurations(times: { [k: string]: Duration }): Duration {
  return Object.keys(times)
    .map((n) => times[n])
    .reduce((d1, d2) => d1.plus(d2), Duration.fromMillis(0));
}

export const DaySummary = (props: DaySummaryProps) => {
  const summary: { [k: string]: Duration } = {};
  const breaks: { [k: string]: Duration } = {};

  for (const time of props.timeSegments) {
    let duration = getDuration(time);

    findOverlappingIntersections(time, props.timeSegments).forEach((i) => {
      duration = duration.minus(i.toDuration());
    });

    const obj = time.break ? breaks : summary;
    if (obj[time.name]) {
      obj[time.name] = obj[time.name].plus(duration);
    } else {
      obj[time.name] = duration;
    }
  }

  const items = createListItem(summary);

  const total = sumOfDurations(summary);
  const breakTotal = sumOfDurations(breaks);

  const totalItem =
    items.length > 0 ? (
      <ListItem key={0}>
        <ListItemText>
          <Typography style={{ fontWeight: 'bold' }}>
            Total - {total.toFormat('hh:mm')}, Break -{' '}
            {breakTotal.toFormat('hh:mm')}
          </Typography>
        </ListItemText>
      </ListItem>
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
