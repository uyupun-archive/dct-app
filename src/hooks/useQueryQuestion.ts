import { useQueryClient } from "@tanstack/react-query";
import { QuestionResponse } from "./useQuestion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isQuestionResponse = (data: any): data is QuestionResponse => {
  return (
    data &&
    typeof data === "object" &&
    "id" in data &&
    typeof data.id === "number" &&
    "question" in data &&
    typeof data.question === "string" &&
    "createdAt" in data &&
    typeof data.createdAt === "string" &&
    "updatedAt" in data &&
    typeof data.updatedAt === "string"
  );
};

const useQueryQuestion = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["question"]);
  if (isQuestionResponse(data)) {
    return { data: data };
  } else {
    return { data: null };
  }
};

export { useQueryQuestion };
