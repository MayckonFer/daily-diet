"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { editMeals } from "@/api/meals/edit-meals";

const editMealSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

type editMealInForm = z.infer<typeof editMealSchema>;

interface MealResponse {
  meal: {
    id: string;
    name: string;
    description: string;
    isDiet: boolean;
  };
}

export function EditMealForm({ meal }: MealResponse) {
  const [isDietCheckButton, setIsDietCheckButton] = useState<string>(
    meal?.isDiet ? "onDiet" : "outDiet"
  );
  const [isDiet, setIsDiet] = useState<boolean | null>(
    meal ? Boolean(meal.isDiet) : null
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<editMealInForm>({
    resolver: zodResolver(editMealSchema),
  });

  const styleYesButton =
    "border-1 border-green-500 bg-green-100 dark:border-1 dark:border-green-500 dark:bg-green-100 dark:text-neutral-700";
  const styleNotButton =
    "border-1 border-red-500 bg-red-100 dark:border-red-500 dark:bg-red-100 dark:text-neutral-700";

  const onDiet = isDietCheckButton === "onDiet" ? styleYesButton : "";
  const outDiet = isDietCheckButton === "outDiet" ? styleNotButton : "";

  async function onSubmitEditMeal(data: editMealInForm) {
    const { name, description } = data;

    const payload = {
      id: meal!.id,
      name: name?.trim() ?? "",
      description: description?.trim() ?? "",
      isDiet: isDiet ?? false,
    };

    await editMeals(payload);

    setTimeout(() => {
      router.push(`/products/${meal?.id}`);
    }, 3000);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitEditMeal)}
        className="max-w-[992px] mx-auto px-4 pt-5 w-full h-[100dvh]"
      >
        <Link href={"/"} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <legend className="text-lg text-center font-bold col-span-2 my-5">
          Editar refeição
        </legend>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start gap-1 col-span-2">
            <div className="flex items-center gap-x-2 gap-y-5">
              <Label htmlFor="name">Nome</Label>
            </div>

            <Input
              defaultValue={meal?.name}
              {...register("name")}
              type="text"
              id="name"
            />
          </div>

          <div className="flex flex-col items-start gap-1 col-span-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="description">Descrição</Label>
            </div>

            <Textarea
              defaultValue={meal?.description}
              {...register("description")}
              id="description"
              className="resize-none h-36"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <legend>Está dentro da dieta?</legend>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={"outline"}
                className={`${onDiet} flex items-center gap-2 col-span-1 h-11`}
                onClick={() => {
                  setIsDietCheckButton("onDiet");
                  setIsDiet(true);
                }}
              >
                <div className="bg-green-500 w-2 h-2 rounded-full"></div>
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
                <div className="bg-red-500 w-2 h-2 rounded-full"></div>
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
          {isSubmitting ? "Salvando..." : "Salvar alteração"}
        </Button>
      </form>
    </>
  );
}
