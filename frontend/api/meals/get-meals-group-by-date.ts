import { AxiosError } from "axios";
import { api } from "@/lib/axios";

import { AlertMessage } from "@/components/alert-message";

interface Meal {
  id: string;
  name: string;
  description: string;
  isDiet: boolean;
  created_at: string;
  updated_at: string;
}

interface GroupedMeals {
  date: string;
  meals: Meal[];
}

export async function getMealsGroupByDate() {
  try {
    const response = await api.get<GroupedMeals[]>("/meal/group-by-date");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return AlertMessage(error.response.data.message, "error");
    } else {
      return AlertMessage(
        "Não foi possível buscar as refeições agora agora, tente novamente mais tarde!",
        "error"
      );
    }
  }
}
