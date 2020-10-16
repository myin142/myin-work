import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { TimeSegment } from '@myin-work/cloud-shared';
import React from 'react';

import './day-time-dialog.scss';

export interface DayTimeDialogProps {
  time: TimeSegment;
  edit: boolean;
  onDialogClose: (time: TimeSegment) => void;
  onDelete: () => void;
}

export interface DayTimeDialogState {
  name: string;
  comment: string;
}

export class DayTimeDialog extends React.Component<
  DayTimeDialogProps,
  DayTimeDialogState
> {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      comment: '',
    };
  }

  private updateName(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    this.setState({ name: value });
  }

  private updateComment(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    this.setState({ comment: value });
  }

  private save() {
    this.doClose({
      start: this.props.time.start,
      name: this.state.name,
      comment: this.state.comment,
    });
  }

  private delete() {
    this.props.onDelete();
    this.doClose(null);
  }

  private doClose(time: TimeSegment) {
    this.props.onDialogClose(time);
    this.setState({
      name: '',
      comment: '',
    });
  }

  private isOpen(): boolean {
    return this.props.time != null;
  }

  private syncPropsToState() {
    this.setState({
      name: this.props.time.name || '',
      comment: this.props.time.comment || '',
    });
  }

  render() {
    return (
      <Dialog
        onClose={() => this.doClose(null)}
        open={this.isOpen()}
        onEnter={this.syncPropsToState.bind(this)}
      >
        <DialogTitle>Edit Time</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={this.state.name}
            onChange={this.updateName.bind(this)}
          />
          <TextField
            label="Comment"
            value={this.state.comment}
            onChange={this.updateComment.bind(this)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.save.bind(this)}>Save</Button>
          {this.props.edit && (
            <Button onClick={this.delete.bind(this)} color="secondary">
              Delete
            </Button>
          )}
          <Button onClick={() => this.doClose(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DayTimeDialog;
