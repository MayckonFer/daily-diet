"use client";

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputMessage } from "@/components/input-alert";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/user/sign-in";

const signInShema = z.object({
  email: z.string().email("E-mail invalido ou vazio!"),
  password: z.string().min(4, "Campo senha deve ter no minimo 4 caracteres!"),
});

type createSignInForm = z.infer<typeof signInShema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createSignInForm>({
    resolver: zodResolver(signInShema),
  });

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn,
  });

  async function onSubmitSignIn(data: createSignInForm) {
    const { email, password } = data;

    await signInFn({ email, password });

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmitSignIn)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Faça login e comece a controlar suas refeições!
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="email">Email</Label>
            {errors.email && <InputMessage message={errors.email.message} />}
          </div>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Label htmlFor="password">Senha</Label>
              {errors.password && (
                <InputMessage message={errors.password.message} />
              )}
            </div>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="******"
            {...register("password")}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-neutral-900 dark:bg-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
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
