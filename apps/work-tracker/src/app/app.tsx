import { AuthClient } from '@myin/auth-client';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';

import './app.scss';

export const App = () => {
  const authClient = new AuthClient();
  authClient.redirectIfUnauthenticated();

  return (
    <BrowserRouter basename={environment.baseHref}>
      <Switch>
        <Route path="/">Test</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
