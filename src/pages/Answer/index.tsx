import React from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";

const Answer: React.FC = () => {
  return (
    <form onSubmit={() => {}} className={styles.container}>
      <div>
        <h1 className={styles.heading}>まとめ</h1>

        <p className={styles.question}>
          問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い
          問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い
        </p>

        <label htmlFor="answer" className={styles.answer}>
          あなたの考え
        </label>
        <textarea id="answer" name="answer" className={styles["text-area"]} />
      </div>
      <div className={styles["button-area"]}>
        <Button type="submit">答える！</Button>
      </div>
    </form>
  );
};

export { Answer };
