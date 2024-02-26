"use client"

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useTheme } from "next-themes";
import React from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

type Props = {};

export default function DarkLightBtn({}: Props) {
  const [animationParent] = useAutoAnimate()
  const { theme, setTheme, resolvedTheme } = useTheme();

  console.log("Current theme:", theme);
  console.log("Resolved theme:", resolvedTheme);

  function toggleTheme() {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  }


  return (
    <button ref={animationParent} className="text-3xl text-white cursor-pointer" onClick={toggleTheme}>
      {resolvedTheme === "light" ? <FaMoon /> : <IoSunny />}
    </button>
  );
}
  