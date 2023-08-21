import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import { useQueryQuestion } from "./useQueryQuestion";
import { QuestionResponse } from "./useQuestion";

type CunningRequest = {
  question_id: number;
};

type CunningResponse = {
  id: number;
  questionId: number;
  answer: string;
  createdAt: string;
  updatedAt: string;
  Question: QuestionResponse;
};

const useCunning = () => {
  const { data: question } = useQueryQuestion();

  const handleClick = useCallback(
    async () => {
      if (question === null) {
        throw new Error();
      }

      const requestData: CunningRequest = {
        question_id: question.id,
      };
      try {
        const res = await axios.post<
          AxiosError,
          AxiosResponse<CunningResponse>
        >(`${import.meta.env.VITE_API_URL}/cunning`, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.data;
      } catch (e) {
        console.error(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { handleClick };
};

export { useCunning };
