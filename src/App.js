import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultLayout from '../src/layout/default/index';
// import HomePage from "./pages/home"
import Auth from './pages/Auth/index';
import Storages from './pages/Storages/index';
import StoragePage from './pages/StoragePage/index';
import Devices from './pages/Devices/index'
function App() {
  return (
    <DefaultLayout>
      <Switch>
        <Route path="/page" component={StoragePage} />
        <Route path="/auth" component={Auth} />
        <Route path="/devices" component={Devices} />
        <Route path="/storages" component={Storages} />
      </Switch>
    </DefaultLayout>
  );
}

export default App;
