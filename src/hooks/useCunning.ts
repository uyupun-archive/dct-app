import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { QuestionResponse } from "./useQuestion";
import { useWallet } from "./useWallet";
import { useAtom } from "jotai";
import { walletAtom } from "../atoms/wallet";

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
  const { sendToken } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [wallet] = useAtom(walletAtom);

  const providerUrl = import.meta.env.VITE_ALCHEMY_API_URL;
  const privateKey = wallet.password;
  const tokenContractAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS;
  const recipientAddress = import.meta.env.VITE_RECIPIENT_ADDRESS;
  const amount = "1000";

  const handleClick = useCallback(
    async (questionId: number) => {
      setIsLoading(true);

      const requestData: CunningRequest = {
        question_id: questionId,
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
        if (res.data) {
          await sendToken(
            providerUrl,
            privateKey,
            tokenContractAddress,
            recipientAddress,
            amount
          );
        }
        return res.data;
      } catch (_) {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { handleClick, isLoading };
};

export { useCunning };
