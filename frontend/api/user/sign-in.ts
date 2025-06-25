import { AlertMessage } from "@/components/alert-message";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface SignInResponse {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInResponse) {
  try {
    const response = await api.post("/user/session", { email, password });

    AlertMessage(response.data.message, "success");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return AlertMessage(error.response.data.message, "error");
    } else {
      return AlertMessage(
        "Não foi possível fazer o login agora, tente novamente mais tarde!",
        "error"
      );
    }
  }
}
