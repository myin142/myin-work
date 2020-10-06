import { AuthClient } from '@myin/auth-client';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';
import { DayTracker } from '@myin-work/day-tracker';

import './app.scss';
import { WorkTimeClient } from '@myin-work/work-time-client';

export const App = () => {
  const authClient = new AuthClient(true);
  const workTimeClient = new WorkTimeClient(authClient);
  if (environment.production) {
    authClient.redirectIfUnauthenticated(true);
  }

  return (
    <BrowserRouter basename={environment.baseHref}>
      <Switch>
        <Route path="/">
          <DayTracker workTimeClient={workTimeClient} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
