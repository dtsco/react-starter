import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from './routes/PrivateRoute';
import generateStore from './store';
import history from './history';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './i18n';
import Auth from 'utils/AuthProvider/index';

import './tailwind.generated.css';

const appStore = generateStore(history);

ReactDOM.render(
  
    <Provider store={appStore}>
      <Auth>
      <ConnectedRouter history={history}>
        <PrivateRoute />
      </ConnectedRouter>
      </Auth>

    </Provider>
,

  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
