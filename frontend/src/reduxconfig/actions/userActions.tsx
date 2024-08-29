import {Dispatch} from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  isError,
  removeError,
} from "../reducers/userReducer";
import {app} from "@/lib/axios";
import {title} from "process";

export const asCurrentUser: any = () => async (dispatch: Dispatch) => {
  try {
    const {data} = await app.post("/admin/current");
    // console.log(data);
    dispatch(loginUser(data.admin));
  } catch (error) {
    console.log(error);
  }
};

export const asLoginUser: any =
  (loginData: any) => async (dispatch: Dispatch) => {
    try {
      const {data} = await app.post("/admin/signin", loginData);

      dispatch(asCurrentUser());
    } catch (error) {
      console.log(error);
    }
  };

export const asLogoutUser: any = (toast: any) => async (dispatch: Dispatch) => {
  try {
    const {data} = await app.get("/admin/signout");
    dispatch(logoutUser());
    console.log(data);
    toast({
      title: data.message,
    });
  } catch (error) {}
};

export const asAddNewData: any =
  (values: any, toast: any) => async (dispatch: Dispatch) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("contact", values.contact);
    formData.append("dob", values.dob);
    formData.append("email", values.email);
    formData.append("gender", values.gender);
    formData.append("image", values?.image[0]);

    try {
      const {data} = await app.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: data.message,
      });
      console.log(data);
      return true;
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
      console.log(error);
      return false;
    }
  };

export const asEditData: any =
  (id: string, values: any, toast: any) => async (dispatch: Dispatch) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("contact", values.contact);
    formData.append("dob", values.dob);
    formData.append("email", values.email);
    formData.append("gender", values.gender);
    formData.append("image", values?.image[0]);

    try {
      const {data} = await app.post(`/find-one-update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: data.message,
      });
      console.log(data);
      return true;
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
      console.log(error);
      return false;
    }
  };

export const asDeleteData: any =
  (id: string, toast: any) => async (dispatch: Dispatch) => {
    try {
      const {data} = await app.post(`/find-one-delete/${id}`);
      toast({
        title: data.message,
      });
      // console.log(data)
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
