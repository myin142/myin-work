import React from 'react';
import { WorkTimeClient } from '@myin-work/work-time-client';
import { TimeUtils } from '@myin-work/time-utils';
import XLSX from 'xlsx';
import ExcellentExport from 'excellentexport';

import './exporter.scss';
import {
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { DateTime } from 'luxon';

export interface ExporterProps {
  workTimeClient: WorkTimeClient;
}

export interface ExporterState {
  table: TimeTableItem[];
  year: number;
  month: number;
}

interface TimeTableItem {
  date: string;
  start: string;
  end: string;
  break: string;
  total: string;
}

export class Exporter extends React.Component<ExporterProps, ExporterState> {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
  }

  private export() {
    // TODO: find way to supported cell merging/formatting
    return ExcellentExport.convert(
      {
        anchor: 'export',
        filename: `${this.state.year}${this.state.month + 1}-timesheet`,
        format: 'xlsx',
      },
      [{ name: 'Timesheet', from: { table: 'data' } }]
    );
  }

  private async show() {
    // TODO: get month from user
    const year = 2020;
    const month = 11;
    const times = await this.props.workTimeClient.getTimeOfDay([
      `${year}-${month}`,
    ]);
    const data = times.map((t) => ({
      date: t.dayId,
      start: TimeUtils.getStartTime(t),
      end: TimeUtils.getEndTime(t),
      break: TimeUtils.getTotalDuration(t, (x) => x.break).toFormat('hh:mm'),
      total: TimeUtils.getTotalDuration(t, (x) => !x.break).toFormat('hh:mm'),
    }));

    this.setState({
      table: data,
      year,
      month: month - 1,
    });
  }

  private getDaysInMonth(): Date[] {
    const date = new Date(this.state.year, this.state.month, 1);
    const days = [];
    while (date.getMonth() === this.state.month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  private findTimeForDate(date: Date): TimeTableItem {
    // TODO: share with daily-time.ts + other places
    const dateStr = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    return this.state.table.find((t) => t.date === dateStr);
  }

  private getTimeValueForDate(
    date: Date,
    fn: (t: TimeTableItem) => string
  ): string {
    const time = this.findTimeForDate(date);
    return time ? fn(time) : '';
  }

  private isNonWorkDay(date: Date): boolean {
    const weekend = [0, 6];
    return weekend.includes(date.getDay());
  }

  private formatDayDate(day: Date): string {
    return DateTime.fromJSDate(day).toFormat('dd/MM');
  }

  private formatDayOfWeek(day: Date): string {
    return DateTime.fromJSDate(day).toFormat('ccc.');
  }

  render() {
    return (
      <div>
        <Button onClick={this.show.bind(this)}>Show</Button>
        {this.state.table.length > 0 && (
          <Link id="export" onClick={this.export.bind(this)}>
            Export
          </Link>
        )}
        {this.state.table.length > 0 && (
          <TableContainer component={Paper}>
            <Table size="small" id="data">
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Break</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.getDaysInMonth().map((day, i) => (
                  <TableRow
                    key={i}
                    className={this.isNonWorkDay(day) ? 'holiday' : ''}
                  >
                    <TableCell component="th">
                      {this.formatDayOfWeek(day)}
                    </TableCell>
                    <TableCell component="th">
                      {this.formatDayDate(day)}
                    </TableCell>
                    <TableCell>
                      {this.getTimeValueForDate(day, (x) => x.start)}
                    </TableCell>
                    <TableCell>
                      {this.getTimeValueForDate(day, (x) => x.end)}
                    </TableCell>
                    <TableCell>
                      {this.getTimeValueForDate(day, (x) => x.total)}
                    </TableCell>
                    <TableCell>
                      {this.getTimeValueForDate(day, (x) => x.break)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    );
  }
}
