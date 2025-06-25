"use client";

import { getMealsGroupByDate } from "@/api/meals/get-meals-group-by-date";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CardMeals() {
  const { data: getMealsByDateFn } = useQuery({
    queryKey: ["get-meals-by-date"],
    queryFn: getMealsGroupByDate,
  });

  return (
    <>
      {getMealsByDateFn?.map((meal) => (
        <div key={meal.date} className="flex flex-col gap-2">
          <strong className="text-lg">{meal.date}</strong>

          {meal.meals.map((item) => (
            <Link
              href={`/products/${item.id}`}
              key={item.id}
              className="flex flex-col items-start gap-1 w-full"
            >
              <div className="flex items-center gap-2 border-1 rounded-sm p-4 w-full">
                <span>
                  {new Date(
                    item.created_at.replace(" ", "T") + "Z"
                  ).toLocaleTimeString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <Separator orientation="vertical" />
                <div className="flex items-center justify-between w-full">
                  <p>{item.name}</p>
                  {item.isDiet ? (
                    <div className="bg-green-200 h-4 w-4 rounded-full"></div>
                  ) : (
                    <div className="bg-red-200 h-4 w-4 rounded-full"></div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}
