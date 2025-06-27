"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUser } from "@/api/user/create-user";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputMessage } from "@/components/input-alert";

const registerShema = z.object({
  name: z.string().min(1, "Campo nome deve ter no minimo 3 caracteres!"),
  email: z.string().email("E-mail invalido ou vazio!"),
  password: z.string().min(4, "Campo senha deve ter no minimo 4 caracteres!"),
});

type createRegisterForm = z.infer<typeof registerShema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createRegisterForm>({
    resolver: zodResolver(registerShema),
  });

  const route = useRouter();

  const { mutateAsync: createUserFn } = useMutation({
    mutationFn: createUser,
  });

  async function onSubmitRegister(data: createRegisterForm) {
    console.log(data);

    const { name, email, password } = data;

    await createUserFn({ name, email, password });

    setTimeout(() => {
      route.push("/sign-in");
    }, 3000);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitRegister)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Criar conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Crie uma conta e organize sua alimentação já!
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="name">Nome</Label>
            {errors.name && <InputMessage message={errors.name.message} />}
          </div>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
          />
        </div>
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
          <div className="flex items-center gap-2">
            <Label htmlFor="password">Senha</Label>
            {errors.password && (
              <InputMessage message={errors.password.message} />
            )}
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
          {isSubmitting ? "Cadastrando..." : "Cadastrar-se"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Fazer login
        </Link>
      </div>
    </form>
  );
}
