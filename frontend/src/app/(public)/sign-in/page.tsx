import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { LoginForm } from "@/src/app/(public)/sign-in/(components)/(form)";

import { ModeToggle } from "@/components/mode-toggle";

import bg_image from "@/public/pexels-ella-olsson-572949-1640770.jpg";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={bg_image}
          alt="Imagem de alimentos relacionados a dietas"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-between gap-2 w-full md:justify-between">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>

          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
