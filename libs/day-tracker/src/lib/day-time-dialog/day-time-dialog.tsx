import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { ProjectNameIDMap } from '@myin-work/openapi';
import { TimeSegment, WorkTimeClient } from '@myin-work/work-time-client';
import React from 'react';

import './day-time-dialog.scss';

export interface DayTimeDialogProps {
  time: TimeSegment;
  edit: boolean;
  onDialogClose: (time: TimeSegment) => void;
  onDelete: () => void;
  workTimeClient: WorkTimeClient;
}

export interface DayTimeDialogState {
  break: boolean;
  selectedProject: number;
  projects: ProjectNameIDMap[];
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
      break: false,
      selectedProject: 0,
      projects: [],
    };
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
      selectedProject: this.props.time.projectId || 0,
      break: this.props.time.break || false,
    });
  }

  async componentDidMount() {
    const projects = await this.props.workTimeClient.getProjects();
    this.setState({ projects });
  }

  render() {
    const { projects, selectedProject } = this.state;

    const projectSelects = projects
      .map(proj => <MenuItem value={proj.projectId}>{proj.projectName}</MenuItem>);

    return (
      <Dialog
        onClose={() => this.doClose(null)}
        open={this.isOpen()}
        onEnter={this.syncPropsToState.bind(this)}
      >
        <DialogTitle>Edit Time</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            {projects.length > 0 &&
              <Select value={selectedProject} onChange={e => this.setState({ selectedProject: e.target.value as number })} >
                {projectSelects}
              </Select>}
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
