import React from "react";
import styles from "./styles.module.scss"
import { Button } from "../../components/Button";

const Top: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Don’t cunning! <div className={styles["font-bold"]}>Think.</div></h1>

        <div className={ styles[ "button-area" ] }>
          <Button
            type="button"
            onClick={ () => {
            }}>
              ウォレットを接続
          </Button>
        </div>

        <div className={ styles[ "button-area" ] }>
          <Button
            type="button"
            onClick={ () => {
            }}>
              考える！
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Top };
