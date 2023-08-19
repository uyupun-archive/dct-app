import React from "react";
import styles from "./styles.module.scss"
import { LinkButton } from "../../components/LinkButton";

const Top: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>
          Don’t cunning! <span className={styles["font-bold"]}>Think.</span>
        </h1>
      </div>
      <div className={styles["button-area"]}>
        <LinkButton type="button" onClick={() => {}}>
          ウォレットを接続
        </LinkButton>
        <LinkButton type="button" onClick={() => {}}>
          考える！
        </LinkButton>
      </div>
    </div>
  );
};

export { Top };
