import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Faça login e comece a controlar suas refeições!
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input id="password" type="password" required placeholder="******" />
        </div>
        <Button type="submit" className="w-full bg-neutral-900 dark:bg-white">
          Entrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tem conta ainda?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Criar conta
        </Link>
      </div>
    </form>
  );
}
