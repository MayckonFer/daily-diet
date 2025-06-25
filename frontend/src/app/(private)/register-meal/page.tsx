import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegisterMeal() {
  return (
    <>
      <form className="max-w-[992px] mx-auto px-4 pt-5 w-full h-[100dvh]">
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
            </div>

            <Input type="text" id="name" />
          </div>

          <div className="flex flex-col items-start gap-1 col-span-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="description">Descrição</Label>
            </div>

            <Textarea id="description" className="resize-none h-36" />
          </div>
          <div className="flex flex-col items-start gap-1 col-span-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="date">Data</Label>
            </div>

            <Input type="date" id="date" />
          </div>
          <div className="flex flex-col items-start gap-1 col-span-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="hour">Hora</Label>
            </div>

            <Input type="hour" id="hour" />
          </div>

          <div className="col-span-2 space-y-2">
            <legend>Está dentro da dieta?</legend>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={"outline"}
                className="flex items-center gap-2 col-span-1 h-11"
              >
                <div className="bg-green-300 w-2 h-2 rounded-full"></div>
                Sim
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className="flex items-center gap-2 col-span-1 h-11"
              >
                <div className="bg-red-300 w-2 h-2 rounded-full"></div>
                Não
              </Button>
            </div>
          </div>
        </div>

        <Button type="submit" variant={"default"} className="w-full h-12 mt-10">
          Cadastrar refeição
        </Button>
      </form>
    </>
  );
}
