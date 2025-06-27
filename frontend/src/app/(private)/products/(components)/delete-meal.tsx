"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteMeals } from "@/api/meals/delete-meals";
import { useRouter } from "next/navigation";

interface MealId {
  mealId: string;
}

export function DeleteMeal({ mealId }: MealId) {
  const { mutateAsync: deleteMealsFn } = useMutation({
    mutationFn: deleteMeals,
  });

  const router = useRouter();

  function handleBackHome() {
    deleteMealsFn(mealId);

    setTimeout(() => {
      router.push("/");
    }, 3000);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className="flex items-center gap-2 w-full h-12"
        >
          <Trash size={15} />
          Excluir refeição
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Deseja realmente excluir o registro da refeição?
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          <DialogClose className="w-full col-span-1 h-12 border-1 border-neutral-900 rounded-sm hover:duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800">
            Cancelar
          </DialogClose>
          <Button
            type="button"
            variant={"default"}
            className="col-span-1 h-12"
            onClick={handleBackHome}
          >
            Sim, excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
