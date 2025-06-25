import MetricCard from "@/components/metric-card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CardMetrics from "./(components)/cards-metrics";

export default function Metrics() {
  return (
    <>
      <main className="max-w-[992px] mx-auto px-4 pt-5 w-full">
        <Link href={"/"} className="flex items-center gap-2 max-w-max mb-5">
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <MetricCard />

        <CardMetrics />
      </main>
    </>
  );
}
