import {
  Dialog,
  DialogContent,
  DialogContentText,
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
  dirty?: boolean;
  onClose?: () => void;
}

function createListItem(
  times: { [k: string]: Duration },
  comments: { [k: string]: string }
) {
  return Object.keys(times).map((n, i) => {
    return (
      <ListItem key={n}>
        <ListItemText>
          {n} - {times[n].toFormat('hh:mm')}: {comments[n]}
        </ListItemText>
      </ListItem>
    );
  });
}

function sumOfDurations(times: { [k: string]: Duration }): Duration {
  const durations = Object.keys(times).map((n) => times[n]);
  return TimeUtils.sumOfDurations(durations);
}

export const DaySummary = (props: DaySummaryProps) => {
  const summary: { [k: string]: Duration } = {};
  const comments: { [k: string]: string } = {};
  const breaks: { [k: string]: Duration } = {};

  for (const time of props.timeSegments) {
    let duration = TimeUtils.getDuration(time);

    TimeUtils.findOverlappingIntersections(time, props.timeSegments).forEach(
      (i) => {
        duration = duration.minus(i.toDuration());
      }
    );

    const obj = time.break ? breaks : summary;
    if (obj[time.name]) {
      obj[time.name] = obj[time.name].plus(duration);
    } else {
      obj[time.name] = duration;
    }

    const prevComment = comments[time.name];
    comments[time.name] = (prevComment ? prevComment : '') + time.comment;
  }

  const items = createListItem(summary, comments);

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
      {props.dirty && (
        <DialogContent>
          <DialogContentText color="error">
            There are unsaved changes. Make sure you save it before leaving.
          </DialogContentText>
        </DialogContent>
      )}

      <List>
        {items}
        {totalItem}
      </List>
    </Dialog>
  );
};

export default DaySummary;
