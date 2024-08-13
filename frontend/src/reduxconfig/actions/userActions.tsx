import {Dispatch} from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  isError,
  removeError,
} from "../reducers/userReducer";

export const asLoginUser: any =
  (loginData: any) => async (dispatch: Dispatch) => {
    // console.log(loginData)
    try {
dispatch(loginUser(loginData))
    } catch (error) {}
  };

export const asLogoutUser: any = () => async (dispatch: Dispatch) => {
  try {
  } catch (error) {}
};

export const asAddNewData: any = (userData:any) => async (dispatch: Dispatch) => {
  try {
  } catch (error) {}
};

export const asEditData: any = () => async (dispatch: Dispatch) => {
  try {
  } catch (error) {}
};
