import { LogOut, User } from "lucide-react";

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

export function MenuHeader() {
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
          <DropdownMenuItem className="flex items-center justify-start gap-2 w-full">
            <LogOut size={16} />
            Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
