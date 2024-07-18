import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {},
  {
    //LOGIN
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    //REQUEST
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    //LOGOUT
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    //MESSAGE ERROR && CLEAR
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);



