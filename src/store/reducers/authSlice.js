import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/set';

export const defaultAuthState = {
  isAuth: null,
  source: null,
  data: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuthState,
  reducers: {
    logUser: (state, action) => {
      set(state, `isAuth`, action.payload.status);
      set(state, `source`, action.payload.source);
    },
    dataUser: (state, action) => {
      set(state, `data`, action.payload);
    }
  },
});

export const { logUser, dataUser } = authSlice.actions;

export default authSlice.reducer;
