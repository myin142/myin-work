import React from 'react';
import { render } from '@testing-library/react';

import SessionExpired from './session-expired';

describe('SessionExpired', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionExpired />);
    expect(baseElement).toBeTruthy();
  });
});
