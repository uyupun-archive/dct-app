import React from "react";
import { Button } from "../../components/Button";
import styles from "./styles.module.scss";

const Think: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>考え中</h1>
        <div className={styles.steps}>
          <span>歩数: </span>100<span>歩</span>
        </div>
        <p className={styles.question}>
          Q.
          問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い
        </p>
      </div>
      <div>
        <Button
          type="button"
          onClick={() => {
            // モーダル開く
          }}
        >
          カンニングする！
        </Button>
        <Button>答え出た！</Button>
      </div>
    </div>
  );
};

export { Think };
