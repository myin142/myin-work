import React from 'react';
import { render } from '@testing-library/react';

import DaySummary from './day-summary';
import { TimeSegment } from '@myin-work/cloud-shared';

describe('DaySummary', () => {
  it('should subtract inner times', () => {
    const times: TimeSegment[] = [
      { start: '08:00', end: '10:00', name: 'Outer' },
      { start: '09:00', end: '10:00', name: 'Inner' },
    ];
    const { baseElement } = render(
      <DaySummary timeSegments={times} show={true} />
    );
    expect(baseElement.textContent).toContain('Outer - 01:00');
    expect(baseElement.textContent).toContain('Inner - 01:00');
  });

  it('should subtract partial inner times', () => {
    const times: TimeSegment[] = [
      { start: '08:00', end: '10:00', name: 'Outer' },
      { start: '09:30', end: '12:00', name: 'Inner' },
    ];
    const { baseElement } = render(
      <DaySummary timeSegments={times} show={true} />
    );
    expect(baseElement.textContent).toContain('Outer - 01:30');
    expect(baseElement.textContent).toContain('Inner - 02:30');
  });

  it('should subtract same start times', () => {
    const times: TimeSegment[] = [
      { start: '08:00', end: '10:00', name: 'Outer' },
      { start: '08:00', end: '09:00', name: 'Inner' },
    ];
    const { baseElement } = render(
      <DaySummary timeSegments={times} show={true} />
    );
    expect(baseElement.textContent).toContain('Outer - 01:00');
    expect(baseElement.textContent).toContain('Inner - 01:00');
  });

  it('should render successfully', () => {
    const times: TimeSegment[] = [
      { start: '08:00', end: '10:00', name: 'First' },
      { start: '10:00', end: '15:00', name: 'Second' },
      { start: '11:00', end: '12:00', name: 'InSecond' },
      { start: '15:00', end: '17:00', name: 'Third' },
      { start: '12:00', end: '13:00', name: 'Lunch', break: true },
      { start: '17:00', name: 'Start Only' },
    ];
    const { baseElement } = render(
      <DaySummary timeSegments={times} show={true} />
    );
    const text = baseElement.textContent;

    expect(text).toContain('First - 02:00');
    expect(text).toContain('Second - 03:00');
    expect(text).toContain('InSecond - 01:00');
    expect(text).toContain('Third - 02:00');
    expect(text).toContain('Start Only - 01:00');
    expect(text).not.toContain('Lunch - 01:00');
    expect(text).toContain('Total - 09:00');
    expect(text).toContain('Break - 01:00');
  });
});
