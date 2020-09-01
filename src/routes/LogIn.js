import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultLayout from 'layout/default/index';
import Auth from 'pages/Auth/index';
function LogInRouter() {
  return (
    <DefaultLayout>
      <Switch>
        <Route path="/auth" component={Auth} />
      </Switch>
    </DefaultLayout>
  );
}

export default LogInRouter;
