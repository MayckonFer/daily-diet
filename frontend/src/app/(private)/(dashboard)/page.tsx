import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CardMeals from "@/src/app/(private)/(dashboard)/(components)/card-meals";
import MetricCard from "@/components/metric-card";

export default function Home() {
  return (
    <>
      <main className="max-w-[992px] mx-auto px-4 pt-5 mb-5 w-full">
        <div className="flex flex-col items-start gap-2 mt-10">
          <MetricCard />

          <h2 className="text-neutral-700 dark:text-white font-normal">
            Refeições
          </h2>
          <Link href={"/register-meal"} className="w-full">
            <Button type="button" variant={"outline"} className="w-full h-12">
              <Plus size={16} />
              Nova refeição
            </Button>
          </Link>
        </div>

        <section className="flex flex-col gap-8 mt-10">
          <CardMeals />
        </section>
      </main>
    </>
  );
}
