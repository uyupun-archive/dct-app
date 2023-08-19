import axios from "axios";
import { useCallback, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useQuestion } from "./useQuestion";
import { stepCountAtom } from "../atoms/stepCount";

type AnswerRequest = {
  question_id: number;
  step_count: number;
  wallet_address: string;
  answer: string;
};

const useAnswer = () => {
  const { data: question } = useQuestion();
  const [stepCount, setStepCount] = useAtom(stepCountAtom);
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      if (question === undefined || typeof target.answer !== "string") return;

      const requestData: AnswerRequest = {
        question_id: question.id,
        step_count: stepCount,
        wallet_address: "",
        answer: target.answer,
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
