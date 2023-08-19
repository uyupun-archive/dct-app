import React from "react";
import styles from "./styles.module.scss"
import { Button } from "../../components/Button";

const Top: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>
          Don’t cunning! <span className={styles["font-bold"]}>Think.</span>
        </h1>
      </div>
      <div className={styles["button-area"]}>
        <Button type="button" onClick={() => {}}>
          ウォレットを接続
        </Button>
        <Button type="button" onClick={() => {}}>
          考える！
        </Button>
      </div>
    </div>
  );
};

export { Top };
