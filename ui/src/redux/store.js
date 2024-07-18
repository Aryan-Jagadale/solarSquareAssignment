import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { trainRouteReducer } from './reducers/trainRoute';

const store = configureStore({
  reducer: {
    user : userReducer,
    trainRoutes:trainRouteReducer
   
  },
});

export default store;

export const server = "http://localhost:4000/api/v1"
