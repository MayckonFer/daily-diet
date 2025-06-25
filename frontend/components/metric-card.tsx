"use client";

import { getMetricsMealsUser } from "@/api/meals/get-metrics-meals-user";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MetricCard() {
  const { data: getMetricsMealsUserFn } = useQuery({
    queryKey: ["metrics-meals"],
    queryFn: getMetricsMealsUser,
  });

  const porcentageMeals = Math.max(
    getMetricsMealsUserFn?.percentageOnDiet ?? 0,
    getMetricsMealsUserFn?.percentageOutDiet ?? 0
  );

  const isOnDietGreater =
    (getMetricsMealsUserFn?.percentageOnDiet ?? 0) >
    (getMetricsMealsUserFn?.percentageOutDiet ?? 0);

  const bgColorOnDiet = isOnDietGreater ? "bg-green-100" : "bg-red-100";
  const textColorOnDiet = isOnDietGreater ? "text-green-100" : "text-red-100";

  return (
    <>
      <Link
        href={"/metrics"}
        className={`flex flex-col items-center py-8 rounded-sm w-full relative ${bgColorOnDiet}`}
      >
        <ArrowUpRight
          size={24}
          className={`${textColorOnDiet} absolute right-2 top-2`}
        />
        <h2 className="text-4xl font-bold text-neutral-900">
          {porcentageMeals}%
        </h2>
        <p className="text-sm font-light text-neutral-700">
          Das refeições dentro da dieta
        </p>
      </Link>
    </>
  );
}
