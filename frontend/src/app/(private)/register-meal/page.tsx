"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMeals } from "@/api/meals/create-meals";
import { useRouter } from "next/navigation";
import { InputMessage } from "@/components/input-alert";
import { useMutation } from "@tanstack/react-query";

const createMealSchema = z.object({
  name: z.string().min(3, "Campo nome deve ter no minimo 3 caracteres!"),
  description: z
    .string()
    .min(6, "Campo descrição deve ter no minimo 6 caracteres!"),
});

type CreateMealForm = z.infer<typeof createMealSchema>;

export default function RegisterMeal() {
  const [isDiet, setIsDiet] = useState<boolean | null>(null);
  const [isDietCheckButton, setIsDietCheckButton] = useState<string>(
    isDiet !== null ? (isDiet ? "onDiet" : "outDiet") : ""
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm<CreateMealForm>({
    resolver: zodResolver(createMealSchema),
  });

  const route = useRouter();

  const styleButtonOnDiet =
    "border-1 border-green-500 bg-green-100 dark:border-1 dark:border-green-500 dark:bg-green-100 dark:text-neutral-700";
  const styleButtonOutDiet =
    "border-1 border-red-500 bg-red-100 dark:border-1 dark:border-red-500 dark:bg-red-100 dark:text-neutral-700";

  const onDiet = isDietCheckButton === "onDiet" ? styleButtonOnDiet : "";
  const outDiet = isDietCheckButton === "outDiet" ? styleButtonOutDiet : "";

  const errorMessageIsDiet: string =
    "Selecione se a refeição está dentro da dieta ou não!";

  const selectWhetherTheMealIsWithinTheDiet = isSubmitted &&
    isDiet === null && <InputMessage message={errorMessageIsDiet} />;

  const { mutateAsync: createMealsFn } = useMutation({
    mutationFn: createMeals,
    onSuccess: () => {
      setTimeout(() => {
        route.push("/");
      }, 3000);
    },
  });

  async function onSubmitCreateMeal(data: CreateMealForm) {
    const { name, description } = data;

    const payload = {
      name: name?.trim() ?? "",
      description: description?.trim() ?? "",
      isDiet: isDiet ?? false,
    };

    console.log(payload);

    if (isDiet === null) {
      return errorMessageIsDiet;
    }

    await createMealsFn(payload);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitCreateMeal)}
        className="max-w-[992px] mx-auto px-4 pt-5 w-full h-[100dvh]"
      >
        <Link href={"/"} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <legend className="text-lg text-center font-bold col-span-2 my-5">
          Nova refeição
        </legend>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start gap-1 col-span-2">
            <div className="flex items-center gap-x-2 gap-y-5">
              <Label htmlFor="name">Nome</Label>
              {errors.name && <InputMessage message={errors.name.message} />}
            </div>

            <Input type="text" id="name" {...register("name")} />
          </div>

          <div className="flex flex-col items-start gap-1 col-span-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="description">Descrição</Label>
              {errors.description && (
                <InputMessage message={errors.description.message} />
              )}
            </div>

            <Textarea
              id="description"
              className="resize-none h-36"
              {...register("description")}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <legend>Está dentro da dieta?</legend>
              {selectWhetherTheMealIsWithinTheDiet}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={"outline"}
                className={`${onDiet} flex items-center gap-2 col-span-1 h-11`}
                onClick={() => {
                  setIsDiet(true);
                  setIsDietCheckButton("onDiet");
                }}
              >
                <div className="bg-green-300 w-2 h-2 rounded-full"></div>
                Sim
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className={`${outDiet} flex items-center gap-2 col-span-1 h-11`}
                onClick={() => {
                  setIsDiet(false);
                  setIsDietCheckButton("outDiet");
                }}
              >
                <div className="bg-red-300 w-2 h-2 rounded-full"></div>
                Não
              </Button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant={"default"}
          className="w-full h-12 mt-10"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar refeição"}
        </Button>
      </form>
    </>
  );
}
