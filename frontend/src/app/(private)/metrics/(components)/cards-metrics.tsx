"use client";

import { getMetricsMealsUser } from "@/api/meals/get-metrics-meals-user";
import { useQuery } from "@tanstack/react-query";

export default function CardMetrics() {
  const { data: getMetricsMealsUserFn } = useQuery({
    queryKey: ["metrics-meals"],
    queryFn: getMetricsMealsUser,
  });

  return (
    <>
      <section className="grid grid-cols-2 gap-2 w-full">
        <h3 className="text-lg text-center font-bold col-span-2 my-5">
          Estátisticas gerais
        </h3>

        <div className="flex flex-col items-center bg-neutral-100 py-8 rounded-sm w-full col-span-2">
          <h2 className="text-4xl font-bold text-neutral-900">
            {getMetricsMealsUserFn?.bestSequence}
          </h2>
          <p className="text-sm font-light text-neutral-700">
            Melhor sequência de pratos dentro da dieta
          </p>
        </div>

        <div className="flex flex-col items-center bg-neutral-100 py-8 rounded-sm w-full col-span-2">
          <h2 className="text-4xl font-bold text-neutral-900">
            {getMetricsMealsUserFn?.totalMeals}
          </h2>
          <p className="text-sm font-light text-neutral-700">
            Refeições registradas
          </p>
        </div>

        <div className="bg-green-100  flex flex-col items-center py-8 rounded-sm w-full col-span-1">
          <h2 className="text-4xl font-bold text-neutral-900">
            {getMetricsMealsUserFn?.totalMealsOnDiet}
          </h2>
          <p className="text-sm font-light text-neutral-700">
            Refeições dentro da dieta
          </p>
        </div>

        <div className="bg-red-100 flex flex-col items-center py-8 rounded-sm w-full col-span-1">
          <h2 className="text-4xl font-bold text-neutral-900">
            {getMetricsMealsUserFn?.totalMealsOutDiet}
          </h2>
          <p className="text-sm font-light text-neutral-700">
            Refeições fora da dieta
          </p>
        </div>
      </section>
    </>
  );
}
