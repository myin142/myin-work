import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';
import { DayTracker } from '@myin-work/day-tracker';
import { Exporter } from '@myin-work/exporter';
import { Login } from '@myin-work/login';

import './app.scss';
import { WorkTimeClient } from '@myin-work/work-time-client';

const TOKEN_ID = 'myinWorkToken';

export const App = () => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_ID));
  const workTimeClient = new WorkTimeClient(token);

  return (
    <BrowserRouter basename={environment.baseHref}>
      <Switch>
        <Route path="/login">
          <Login tokenId={TOKEN_ID} />
        </Route>

        {token == null && <Redirect to='/login' />}
        <Route path="/export">
          <Exporter workTimeClient={workTimeClient} />
        </Route>
        <Route path="/">
          <DayTracker workTimeClient={workTimeClient} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
