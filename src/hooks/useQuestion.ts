import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";

type QuestionResponse = {
  id: number;
  question: string;
  createdAt: string;
  updatedAt: string;
};

const useQuestion = () => {
  const query = useQuery({
    queryKey: ["question"],
    queryFn: () =>
      axios
        .get<AxiosError, AxiosResponse<QuestionResponse>>(
          `${import.meta.env.VITE_API_URL}/question`
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  return query;
};

export { useQuestion };
