import {
  Button,
  Dialog,
  DialogActions,
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
import './day-summary.scss';
import { TimeSummary, TimeUtils } from '@myin-work/time-utils';

export interface DaySummaryProps {
  timeSegments: TimeSegment[];
  show: boolean;
  dirty?: boolean;
  onClose?: () => void;
}

function createListItem(summary: TimeSummary[]) {
  return summary.map(({ name, duration, comments }) => {
    return (
      <ListItem key={name}>
        <ListItemText>
          {name} - {duration.toFormat('hh:mm')}: {comments.join(', ')}
        </ListItemText>
      </ListItem>
    );
  });
}

export class DaySummary extends React.Component<DaySummaryProps> {

  constructor(props) {
    super(props);
  }

  render() {

    const summaries = TimeUtils.getSummaryOfTimes(this.props.timeSegments);
    const times = summaries.filter((x) => !x.break);
    const breaks = summaries.filter((x) => x.break);

    const items = createListItem(times);
    const total = TimeUtils.sumOfDurations(times.map((x) => x.duration));
    const breakTotal = TimeUtils.sumOfDurations(breaks.map((x) => x.duration));

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
      <Dialog open={this.props.show} onClose={this.props.onClose}>
        <DialogTitle>Summary of today</DialogTitle>
        {this.props.dirty && (
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
  }
}

export default DaySummary;
