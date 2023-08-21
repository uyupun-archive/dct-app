import axios from "axios";
import { useCallback, FormEvent, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { stepCountAtom } from "../atoms/stepCount";
import { useQueryQuestion } from "./useQueryQuestion";

type AnswerRequest = {
  question_id: number;
  step_count: number;
  wallet_address: string;
  answer: string;
};

const useAnswer = () => {
  const { data: question } = useQueryQuestion();
  const [stepCount, setStepCount] = useAtom(stepCountAtom);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (
      e: FormEvent<HTMLFormElement>,
      setIsError: Dispatch<SetStateAction<boolean>>
    ) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const answer = target?.answer?.value;
      if (
        question === null ||
        typeof answer !== "string" ||
        answer.length === 0
      ) {
        setIsError(true);
        return;
      }

      const requestData: AnswerRequest = {
        question_id: question.id,
        step_count: stepCount,
        // TODO: 仮でデータを挿入している
        wallet_address: "wallet_address",
        answer: answer,
      };
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/answer`,
          requestData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setStepCount(0);
        navigate("/complete");
      } catch (e) {
        console.error(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { handleSubmit };
};

export { useAnswer };
