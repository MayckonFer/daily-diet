import { AlertMessage } from "@/components/alert-message";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export async function deleteMeals(id: string) {
  try {
    const response = await api.delete(`/meal/delete/${id}`);

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
