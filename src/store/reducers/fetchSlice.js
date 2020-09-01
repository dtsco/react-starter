import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import get from 'lodash/get';
import update from 'lodash/update';
import mergeObjects from 'utils/mergeObjects';

export const defaultFetchState = {
  isInit: true,
  apiKey: '',
  loading: false,
  error: null,
  dataSource: null,
  total: null,
  size: null,
  page: null,
  limit: null,
  filter: {},
  sort: {
    field: null,
    order: null,
  },
};

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState: {},
  reducers: {
    init: (state, action) => {
      const { payload = {} } = action;
      const { uniqId, ...initialOptions } = payload;
      state[uniqId] = mergeObjects(defaultFetchState, initialOptions);
    },
    destroy: (state, action) => {
      delete state[action.payload];
    },
    reset: (state, action) => {
      state[action.payload] = cloneDeep(defaultFetchState);
    },
    fetch: (state, action) => {
      const uniqId = get(action, 'payload.uniqId');
      set(state, `[${uniqId}].loading`, true);
      update(state, `[${uniqId}].size`, (v) =>
        get(action, 'payload.params.size', v),
      );
      update(state, `[${uniqId}].page`, (v) =>
        get(action, 'payload.params.page', v),
      );
      update(state, `[${uniqId}].filter`, (v) =>
        get(action, 'payload.params.filter', v),
      );
      update(state, `[${uniqId}].sort`, (v) =>
        get(action, 'payload.params.sort', v),
      );
      update(state, `[${uniqId}].limit`, (v) =>
        get(action, 'payload.params.limit', v),
      );
      return state;
    },
    fetchSuccess: (state, action) => {
      const uniqId = get(action, 'payload.uniqId');

      set(state, `[${uniqId}].loading`, false);
      set(
        state,
        `[${uniqId}].dataSource`,
        get(action, 'payload.response.data'),
      );
      return state;
    },
    fetchFail: (state, action) => {
      const uniqId = get(action, 'payload.uniqId');
      set(state, `[${uniqId}].loading`, false);
      set(state, `[${uniqId}].error`, get(action, 'payload.error'));
    },
  },
});

export const {
  init,
  destroy,
  reset,
  fetch,
  fetchSuccess,
  fetchFail,
} = fetchSlice.actions;

export default fetchSlice.reducer;
