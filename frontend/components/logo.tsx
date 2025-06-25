"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import logo_light from "@/public/logo-lightmode.svg";
import logo_dark from "@/public/logo-darkmode.svg";

export function Logo() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Garante que estamos no cliente
  }, []);

  if (!isMounted) return null; // Evita renderizar antes de saber o tema

  const showLogoAccordingToTheme = theme === "dark" ? logo_light : logo_dark;

  return (
    <div>
      <Image src={showLogoAccordingToTheme} alt="Logo Daily Diet" />
    </div>
  );
}
