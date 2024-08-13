import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface UsersState {
  user: any;
  errors: [any];
  isLogin: boolean;
}

const initialState: UsersState = {
  user: null,
  errors: [null],
  isLogin: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isLogin = false;
      state.errors = [null];
    },
    isError: (state, action) => {
      state.errors.push(action.payload);
    },
    removeError: (state, action) => {
      state.errors = [null];
    },
  },
});

export const {loginUser,logoutUser,isError,removeError} = userReducer.actions
export default userReducer.reducer
