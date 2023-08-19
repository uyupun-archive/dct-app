import React from "react";
import styles from "./styles.module.scss"
import { LinkButton } from "../../components/LinkButton";

const Answer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>まとめ</h1>
        
        <p className={styles.question}>
          問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い
          問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い
        </p>

        <p className={styles.answer}>あなたの考え</p>
        <textarea className={ styles["text-area"] } />
      </div>
      <div className={styles["button-area"]}>
        <LinkButton href="/complete">答える！</LinkButton>
      </div>
    </div>
  );
};

export { Answer };
