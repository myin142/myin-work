import { List, ListItem, ListItemText } from '@material-ui/core';
import { TimeSegment } from '@myin-work/cloud-shared';
import React from 'react';
import { DateTime, Duration } from 'luxon';

import './day-summary.scss';

export interface DaySummaryProps {
  timeSegments: TimeSegment[];
}

export const DaySummary = (props: DaySummaryProps) => {
  const summary: { [k: string]: Duration } = {};

  // Ignore last item
  for (let i = 0; i < props.timeSegments.length - 1; i++) {
    const time = props.timeSegments[i];
    const nextTime = props.timeSegments[i + 1];

    const date = DateTime.fromISO(time.time);
    const nextDate = DateTime.fromISO(nextTime.time);

    const duration = nextDate.diff(date);

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

  return <List>{items}</List>;
};

export default DaySummary;
