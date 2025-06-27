"use client";
import { Logo } from "./logo";

import Link from "next/link";
import { MenuHeader } from "./menu-header";

export default function Header() {
  return (
    <>
      <header className="shadow-sm dark:border-b-1 dark:shadow-none">
        <div className="flex items-center justify-between max-w-[992px] mx-auto px-4 py-2">
          <Link href={"/"}>
            <Logo />
          </Link>

          <MenuHeader />
        </div>
      </header>
    </>
  );
}
