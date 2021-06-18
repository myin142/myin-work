import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';

import './login.scss';

export interface LoginProps {
  tokenId: string;
}

export const Login = ({ tokenId }: LoginProps) => {
  const [token, setToken] = useState('');
  const history = useHistory();

  if (token != null) {
    return <Redirect to='/'/>
  }

  const saveToken = () => {
    localStorage.setItem(tokenId, token);
    history.push('/');
  }

  return (
    <div>
      <TextField value={token} onChange={e => setToken(e.target.value)} />
      <Button onClick={() => saveToken()}>
        Login
      </Button>
    </div>
  );
};

export default Login;
