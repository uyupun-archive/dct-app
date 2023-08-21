import React from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { LinkButton } from "../../components/LinkButton";

const Top: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>
          Don’t cunning! <span className={styles["font-bold"]}>Think</span>.
        </h1>
      </div>
      <div className={styles["button-area"]}>
        <Button type="button" onClick={() => {}}>
          ウォレットを接続
        </Button>
        <LinkButton type="button" to="/think">
          考える！
        </LinkButton>
      </div>
    </div>
  );
};

export { Top };
