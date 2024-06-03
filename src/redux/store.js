import { configureStore } from '@reduxjs/toolkit';
import taxRegimesReducer from './taxRegimesSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    taxRegimes: taxRegimesReducer,
    auth: authReducer,
  },
});

export default store;
