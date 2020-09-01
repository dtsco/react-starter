import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/set';

export const defaultAuthState = {
  isAuth: null,
  source: null,
  data: null,
  access_token: localStorage.getItem('access_token')
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
      set(state, `data`, action.payload.data);
    },
    setToken:(state, action) => {
      set(state, `access_token`, action.payload.access_token);
    },
  },
});

export const { logUser, dataUser, setToken } = authSlice.actions;

export default authSlice.reducer;
