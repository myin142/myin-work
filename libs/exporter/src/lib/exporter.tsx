import React from 'react';
import { WorkTimeClient } from '@myin-work/work-time-client';
import XLSX from 'xlsx';

import './exporter.scss';
import { Button } from '@material-ui/core';

export interface ExporterProps {
  workTimeClient: WorkTimeClient;
}

export class Exporter extends React.Component<ExporterProps> {
  private export() {
    const wb = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([['08:00', '17:00', '=B1-A1']], {
      cellDates: true,
    });
    XLSX.utils.book_append_sheet(wb, worksheet, 'SheetJS');
    XLSX.writeFile(wb, 'test.xlsx');
  }

  render() {
    return (
      <div>
        <Button onClick={this.export.bind(this)}>Export</Button>
      </div>
    );
  }
}
