import React from 'react';
import { render } from '@testing-library/react';

import Exporter from './exporter';

describe('Exporter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Exporter />);
    expect(baseElement).toBeTruthy();
  });
});
