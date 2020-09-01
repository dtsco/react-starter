import fetchReducer from './fetchSlice';
import userReducer from './authSlice'

const rootReducer = {
  fetch: fetchReducer,
  user: userReducer
};

export default rootReducer;
