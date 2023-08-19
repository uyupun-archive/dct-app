import React from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { LinkButton } from "../../components/LinkButton";
import { usePedometer } from "../../hooks/usePedometer";
import { useQuestion } from "../../hooks/useQuestion";

const Think: React.FC = () => {
  const { stepCount } = usePedometer();

  const { isLoading, error, data } = useQuestion();
  if (isLoading || data === undefined) {
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
        <p className={styles.question}>Q. {data.question}</p>
      </div>
      <div className={styles["button-area"]}>
        <Button
          type="button"
          onClick={() => {
            // モーダル開く
          }}
        >
          カンニングする！
        </Button>
        <LinkButton to="/answer">考えをまとめる！</LinkButton>
      </div>
    </div>
  );
};

export { Think };
