import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default (history) => {
  const store = configureStore({
    reducer: {
      router: connectRouter(history),
      ...reducers,
    },
    middleware: [
      ...getDefaultMiddleware({ thunk: false }),
      sagaMiddleware,
      routerMiddleware(history),
    ],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};
