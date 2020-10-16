import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
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
  break: boolean;
}

export class DayTimeDialog extends React.Component<
  DayTimeDialogProps,
  DayTimeDialogState
> {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  private get defaultState(): DayTimeDialogState {
    return {
      name: '',
      comment: '',
      break: false,
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

  private updateBreak(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.checked;
    this.setState({ break: value });
  }

  private save() {
    this.doClose({
      start: this.props.time.start,
      ...this.state,
    });
  }

  private delete() {
    this.props.onDelete();
    this.doClose(null);
  }

  private doClose(time: TimeSegment) {
    this.props.onDialogClose(time);
    this.setState(this.defaultState);
  }

  private isOpen(): boolean {
    return this.props.time != null;
  }

  private syncPropsToState() {
    this.setState({
      name: this.props.time.name || '',
      comment: this.props.time.comment || '',
      break: this.props.time.break || false,
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
          <Box display="flex" flexDirection="column">
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.break}
                  onChange={this.updateBreak.bind(this)}
                />
              }
              label="Break"
            />
          </Box>
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
