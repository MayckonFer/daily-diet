import { AlertMessage } from "@/components/alert-message";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface CreateUserResponse {
  name: string;
  email: string;
  password: string;
}

export async function createUser({
  name,
  email,
  password,
}: CreateUserResponse) {
  try {
    const response = await api.post("/user/create", { name, email, password });

    AlertMessage(response.data.message, "success");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return AlertMessage(error.response.data.message, "error");
    } else {
      return AlertMessage(
        "Não foi possível criar um usuário agora, tente novamente mais tarde!",
        "error"
      );
    }
  }
}
