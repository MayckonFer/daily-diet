import { cookies } from "next/headers";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

interface Params {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: Params) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  const response = await api.get(`/meal/list/${params.id}`, {
    headers: {
      Cookie: `session_id=${sessionId}`,
    },
  });

  const meal = response.data;

  const bgColorIsDiet = meal?.isDiet ? "bg-green-100" : "bg-red-100";
  const messageColorIsDiet = meal?.isDiet ? "bg-green-500" : "bg-red-500";
  const messageIsDiet = meal?.isDiet ? "dentro da dieta" : "fora da dieta";

  const date = new Date(meal.created_at);

  // Ajusta o fuso horário para UTC-3 (Brasília)
  const dateBR = new Date(date.getTime() - 3 * 60 * 60 * 1000);

  const day = String(dateBR.getDate()).padStart(2, "0");
  const month = String(dateBR.getMonth() + 1).padStart(2, "0");
  const year = dateBR.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const hour = String(dateBR.getHours()).padStart(2, "0");
  const minute = String(dateBR.getMinutes()).padStart(2, "0");

  return (
    <>
      <main className="max-w-[992px] mx-auto px-4 pt-5 mb-5 w-full h-[100vh]">
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            <div className={`${bgColorIsDiet} py-4 rounded-sm`}>
              <h2 className="text-neutral-700 text-center dark:text-white font-normal">
                Refeições
              </h2>
            </div>

            <div className="flex flex-col items-start gap-4 mt-10">
              <div className="flex flex-col items-start ga-2">
                <h3 className="text-xl font-bold text-neutral-900">
                  {meal?.name}
                </h3>
                <p className="text-sm font-light text-neutral-700">
                  {meal?.description}
                </p>
              </div>

              <div className="flex flex-col items-start gap-1">
                <h4 className="text-sm font-bold text-neutral-900">
                  Data e hora
                </h4>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-light text-neutral-700">
                    {formattedDate} às{" "}
                    <span>
                      {hour}:{minute}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-4 py-2 max-w-max mt-5">
              <div
                className={`${messageColorIsDiet} w-2 h-2 rounded-full`}
              ></div>
              <p className="text-sm font-light text-neutral-700">
                {messageIsDiet}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-10">
            <Link href={`/edit/${meal?.id}`} className="w-full">
              <Button
                type="button"
                variant={"default"}
                className="flex items-center gap-2 w-full h-12"
              >
                <Edit size={15} />
                Editar refeição
              </Button>
            </Link>
            <Button
              type="button"
              variant={"outline"}
              className="flex items-center gap-2 w-full h-12"
            >
              <Trash size={15} />
              Excluir refeição
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
