import { call, put, select, takeEvery } from 'redux-saga/effects';
import dataProvider from '../../dataProvider';

import { makeSelectFetchParamByEntityId } from '../selectors/fetch';
import { fetch, fetchSuccess, fetchFail } from '../reducers/fetchSlice';
import { GET_LIST, GET_SINGLE } from '../../utils/fetch/fetchTypes';

export function* fetchRequest(action) {
  const { uniqId, params = {}, meta = {} } = action.payload;
  try {
    const { fetchType, push, sync, onSync, getSyncData, query = null } = meta;
    const dataInstance = dataProvider();
    const apiKey = yield select(
      makeSelectFetchParamByEntityId(uniqId, 'apiKey'),
    );

    const currentState = yield select(
      makeSelectFetchParamByEntityId(uniqId, 'data'),
    );

    // const page = yield select(makeSelectFetchParamByEntityId(uniqId, 'page'));
    // const size = yield select(makeSelectFetchParamByEntityId(uniqId, 'size'));
    // const filter = yield select(
    //   makeSelectFetchParamByEntityId(uniqId, 'filter'),
    // );
    // const limit = yield select(makeSelectFetchParamByEntityId(uniqId, 'limit'));
    // const sort = yield select(makeSelectFetchParamByEntityId(uniqId, 'sort'));

    const response = yield call(
      dataInstance[fetchType],
      apiKey,
      {
        ...params,
      },
      meta,
    );

    if (sync) {
      if (query) {
        yield call(onSync, query);
      } else {
        yield call(onSync);
      }
    }
    if (getSyncData) {
      yield call(getSyncData.fetchFunc, getSyncData.params);
    }
    // todo: remove hard code
    if (fetchType === GET_LIST || fetchType === GET_SINGLE) {
      yield put(fetchSuccess({ uniqId, response }));
    }
  } catch (error) {
    console.log(error, 'err');
    yield put(fetchFail({ uniqId, error }));
  }
}

export default function* fetchSaga() {
  yield takeEvery([fetch.type], fetchRequest);
}
