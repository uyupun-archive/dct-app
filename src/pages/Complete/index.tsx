import React from "react";
import styles from "./styles.module.scss"
import { Button } from "../../components/Button";

const Complete: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>お疲れ様でした</h1>
      <div className={styles["button-area"]}>
        <Button type="button" onClick={() => {}}>
          トップへ戻る！
          </Button>
        </div>
    </div>
  );
};

export { Complete };
