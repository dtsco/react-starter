import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
} from './auth';
import LoginRouter from './LogIn';
import RootRouter from './Root';

export function PrivateRoute() {
  return (
    <>
      <Switch>
        <Route
          path={[
            '/home'
          ]}
          component={userIsAuthenticatedRedir(RootRouter)}
        />
        <Route
          path={['/auth']}
          component={userIsNotAuthenticatedRedir(LoginRouter)}
        />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}
export default PrivateRoute; 