import axios from "axios";
import {
  useCallback,
  FormEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { stepCountAtom } from "../atoms/stepCount";
import { useQueryQuestion } from "./useQueryQuestion";
import { walletAtom } from "../atoms/wallet";

type AnswerRequest = {
  question_id: number;
  step_count: number;
  wallet_address: string;
  answer: string;
};

const useAnswer = () => {
  const { data: question } = useQueryQuestion();
  const [stepCount] = useAtom(stepCountAtom);
  const [wallet] = useAtom(walletAtom);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (
      e: FormEvent<HTMLFormElement>,
      setIsError: Dispatch<SetStateAction<boolean>>
    ) => {
      e.preventDefault();
      setIsLoading(true);
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
        wallet_address: wallet.address,
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
        navigate("/complete");
      } catch (e) {
        alert("回答に失敗しました🤓");
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { handleSubmit, isLoading };
};

export { useAnswer };
