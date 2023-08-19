import React from "react";
import styles from "./styles.module.scss";
import { LinkButton } from "../../components/LinkButton";

const Complete: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>お疲れ様でした</h1>
      <div className={styles["button-area"]}>
        <LinkButton to="/">トップへ戻る！</LinkButton>
      </div>
    </div>
  );
};

export { Complete };
