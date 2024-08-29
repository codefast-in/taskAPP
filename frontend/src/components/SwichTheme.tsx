"use client";

import React, {useEffect, useState} from "react";

import {useTheme} from "next-themes";
import {Button} from "./ui/button";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";

export default function SwichTheme() {
  const {setTheme, theme} = useTheme();

  const toggleMode = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <Button onClick={toggleMode} variant="ghost">
      {theme == "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}