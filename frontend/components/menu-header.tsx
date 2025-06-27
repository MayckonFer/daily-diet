"use client";

import { LogOut, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "./mode-toggle";
import { logOut } from "@/api/user/logout";

export function MenuHeader() {
  const { mutateAsync: logoutFn } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <User size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center justify-start gap-2 w-full">
            <User size={16} />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-start gap-2 w-full">
            <ModeToggle />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center justify-start gap-2 w-full"
            onClick={() => logoutFn()}
          >
            <LogOut size={16} />
            Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
