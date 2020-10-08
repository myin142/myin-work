import React from 'react';
import { render } from '@testing-library/react';

import DayTimeline from './day-timeline';

describe('DayTimeline', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DayTimeline />);
    expect(baseElement).toBeTruthy();
  });
});
