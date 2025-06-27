import { AlertMessage } from "@/components/alert-message";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export async function logOut() {
  try {
    const response = await api.post("/user/logout", {});

    AlertMessage(response.data.message, "success");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return AlertMessage(error.response.data.message, "error");
    } else {
      return AlertMessage(
        "Não foi possível sair agora, tente novamente mais tarde!",
        "error"
      );
    }
  }
}
