import { cookies } from "next/headers";
import { api } from "@/lib/axios";

import { EditMealForm } from "../(components)/edit-meal-form";

interface Params {
  params: {
    id: string;
  };
}

export default async function EditMeal({ params }: Params) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  const response = await api.get(`/meal/list/${params.id}`, {
    headers: {
      Cookie: `session_id=${sessionId}`,
    },
  });

  const meal = response.data;

  console.log(meal);

  return (
    <>
      <EditMealForm meal={response.data} />
    </>
  );
}
