import React from 'react';
import { render } from '@testing-library/react';

import DayTracker from './day-tracker';

describe('DayTracker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DayTracker />);
    expect(baseElement).toBeTruthy();
  });
});
