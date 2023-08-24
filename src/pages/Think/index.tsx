import React from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { LinkButton } from "../../components/LinkButton";
import { usePedometer } from "../../hooks/usePedometer";
import { useQuestion } from "../../hooks/useQuestion";
import { useCunning } from "../../hooks/useCunning";

const Think: React.FC = () => {
  const { stepCount } = usePedometer();
  const { isLoading: questionIsLoading, error, data: question } = useQuestion();
  const { handleClick, isLoading: cunningIsLoading } = useCunning();

  if (questionIsLoading || question === undefined) {
    return <></>;
  }

  if (error) {
    return <div>エラーです。</div>;
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>考え中</h1>
        <div className={styles.steps}>
          <span>歩数: </span>
          {stepCount}
          <span>歩</span>
        </div>
        <p className={styles.question}>Q. {question.question}</p>
      </div>
      <div className={styles["button-area"]}>
        <Button
          type="button"
          onClick={async () => {
            // TODO: モーダルを開き、その中でhandleClickを実行する
            if (confirm("1,000CNGを使用して、カンニングしますか？")) {
              try {
                const cunning = await handleClick(question.id);
                if (cunning === undefined) {
                  throw new Error();
                }
                alert(`A. ${cunning.answer}`);
              } catch (_) {
                alert("カンニングに失敗しました🤓");
              }
            }
          }}
          disabled={cunningIsLoading}
        >
          {cunningIsLoading ? "カンニング中です👀" : "カンニングする！"}
        </Button>
        <LinkButton to="/answer">考えをまとめる！</LinkButton>
      </div>
    </div>
  );
};

export { Think };
