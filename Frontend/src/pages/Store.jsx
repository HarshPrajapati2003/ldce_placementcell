import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Authentication/Redux/AuthSlice';
import formReducer from './Form/Redux/FormSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    form: formReducer
  },
});
