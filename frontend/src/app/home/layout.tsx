"use client";

import SwichTheme from "@/components/SwichTheme";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {asCurrentUser, asLogoutUser} from "@/reduxconfig/actions/userActions";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {isLogin, user} = useSelector((state: any) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
//   console.log(user);
  const {toast} = useToast();

  useEffect(() => {
    dispatch(asCurrentUser());
    !isLogin && router.push("/");
  }, [isLogin]);


  return (
    <div>
      <div className="w-full flex justify-end">
       <SwichTheme/>  {isLogin ? (
          <span>
            {user.name}{" "}
            <Button
              onClick={() => dispatch(asLogoutUser(toast))}
              variant={"link"}>
              Logout
            </Button>
          </span>
        ) : (
          <span>not login</span>
        )}
      </div>
      {children}
    </div>
  );
}

export default Layout;
