import React from 'react';
import { render } from '@testing-library/react';

import DayTimeDialog from './day-time-dialog';

describe('DayTimeDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DayTimeDialog />);
    expect(baseElement).toBeTruthy();
  });
});
