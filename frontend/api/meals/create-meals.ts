import { AlertMessage } from "@/components/alert-message";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface CreateMealsResponse {
  name: string;
  description: string;
  isDiet: boolean;
}

export async function createMeals({
  name,
  description,
  isDiet,
}: CreateMealsResponse) {
  try {
    const response = await api.post("/meal/create", {
      name,
      description,
      isDiet,
    });

    return AlertMessage(response.data.message, "success");
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return AlertMessage(error.response.data.message, "error");
    } else {
      return AlertMessage(
        "Não foi possível criar uma refeição agora, tente novamente mais tarde!",
        "error"
      );
    }
  }
}
