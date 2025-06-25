import { AlertMessage } from "@/components/alert-message";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface EditMealsResponse {
  id: string;
  name: string;
  description: string;
  isDiet: boolean;
}

export async function editMeals({
  id,
  name,
  description,
  isDiet,
}: EditMealsResponse) {
  try {
    const response = await api.put(`/meal/updated/${id}`, {
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
        "Não foi possível editar a refeição agora, tente novamente mais tarde!",
        "error"
      );
    }
  }
}
