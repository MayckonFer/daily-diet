import { AlertMessage } from "@/components/alert-message";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface GetMetricsMealsUserResponse {
  totalMeals: number;
  totalMealsOnDiet: number;
  totalMealsOutDiet: number;
  bestSequence: number;
  percentageOnDiet: number;
  percentageOutDiet: number;
}

export async function getMetricsMealsUser() {
  try {
    const response = await api.get<GetMetricsMealsUserResponse>(
      "/meal/metrics"
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return AlertMessage(error.response.data.message, "error");
    } else {
      return AlertMessage(
        "Não foi possível buscar as metricas agora, tente novamente mais tarde!",
        "error"
      );
    }
  }
}
