"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

import logo_light from "@/public/logo-lightmode.svg";
import logo_dark from "@/public/logo-darkmode.svg";

export function Logo() {
  const { theme } = useTheme();

  const showLogoAccordingToTheme = theme === "dark" ? logo_light : logo_dark;

  return (
    <>
      <Image src={showLogoAccordingToTheme} alt="Logo Daily Diet" />
    </>
  );
}
