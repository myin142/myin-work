import React from 'react';
import { render } from '@testing-library/react';

import DaySummary from './day-summary';

describe('DaySummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DaySummary />);
    expect(baseElement).toBeTruthy();
  });
});
