import { createReducer } from '@reduxjs/toolkit';

export const trainRouteReducer = createReducer(
  { trainRoutes: [] },
  {
    allRoutesRequest: state => {
      state.loading = true;
    },
    allRoutesSuccess: (state, action) => {
      state.loading = false;
      state.trainRoutes = action.payload;
    },
    allRoutesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
