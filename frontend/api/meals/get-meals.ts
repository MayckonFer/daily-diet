import { AlertMessage } from "@/components/alert-message";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface GetMealsResponse {
  id: string;
  name: string;
  description: string;
  isDiet: boolean;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

export async function getMeals() {
  try {
    const response = await api.get<GetMealsResponse[]>("/meal/list");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return AlertMessage(error.response.data.message, "error");
    } else {
      return AlertMessage(
        "Não foi possível buscar as refeições agora, tente novamente mais tarde!",
        "error"
      );
    }
  }
}
