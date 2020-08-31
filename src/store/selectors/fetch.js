import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { defaultFetchState } from '../reducers/fetchSlice';

export const selectFetchEntities = (state) => state.fetch || {};

export const makeSelectFetchEntityById = (uniqId) =>
  createSelector(selectFetchEntities, (substate) =>
    get(substate, uniqId, defaultFetchState),
  );

export const makeSelectFetchParamByEntityId = (uniqId, param) => {
  return createSelector(makeSelectFetchEntityById(uniqId), (substate) => {
    return get(substate, param, defaultFetchState[param]);
  });
};
