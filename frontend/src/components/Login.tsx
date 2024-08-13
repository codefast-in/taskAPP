"use client";
import React, {useState} from "react";
import * as Yup from "yup";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "./ui/button";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {asLoginUser} from "@/reduxconfig/actions/userActions";
import {Formik} from "formik";
import {Value} from "@radix-ui/react-select";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Fill the password"),
});

function Login() {
  const {isLogin} = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  // console.log(loginData)
  const sendData = async (value: {email: string; password: string}) => {
    dispatch(asLoginUser(value));
  };

  return (
    <Card className="p-5 mx-auto max-w-[450px]  space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={sendData}>
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
          validateOnChange,
        }) => (
          <div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email/User ID</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={handleChange("email")}
                  required
                />
                {touched.email && errors.email && <span>{errors.email}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={handleChange("password")}
                  required
                />
                {touched.password && errors.password && (
                  <span>{errors.password}</span>
                )}
              </div>
              <Button type="submit" className="w-full" onClick={()=>handleSubmit()}>
                Sign In
              </Button>
              <Button variant="outline" className="w-full">
                Sign in with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                <Link href="#" className="underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </Card>
  );
}

export default Login;
