import { Button, IconButton, Snackbar, Icon } from '@material-ui/core';
import React from 'react';

import './session-expired.scss';

export interface SessionExpiredProps {
    open: boolean;
    handleClose: () => void;
}

export const SessionExpired = (props: SessionExpiredProps) => {
  return (
    <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={props.open}
    onClose={props.handleClose}
    autoHideDuration={4000}
    message="Session was expired and has been refreshed"
    action={
      <React.Fragment>
        <Button color="secondary" size="small" onClick={props.handleClose}>Close</Button>
      </React.Fragment>
    }
  />
  );
};
