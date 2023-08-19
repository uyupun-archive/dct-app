import React from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { LinkButton } from "../../components/LinkButton";
import { usePedometer } from "../../hooks/usePedometer";

const Think: React.FC = () => {
  const { stepCount } = usePedometer();

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>考え中</h1>
        <div className={styles.steps}>
          <span>歩数: </span>
          {stepCount}
          <span>歩</span>
        </div>
        <p className={styles.question}>
          Q.
          問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い
        </p>
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
        <LinkButton href="/answer">考えをまとめる！</LinkButton>
      </div>
    </div>
  );
};

export { Think };
