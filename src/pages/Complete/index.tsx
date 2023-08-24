import React from "react";
import styles from "./styles.module.scss";
import { LinkButton } from "../../components/LinkButton";
import { useAtom } from "jotai";
import { stepCountAtom } from "../../atoms/stepCount";

const Complete: React.FC = () => {
  const [stepCount] = useAtom(stepCountAtom);
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>お疲れ様です！</h1>
        <h2 className={styles.sub}>
          {stepCount.toLocaleString()}CNG獲得しました🎉
        </h2>
      </div>
      <div>
        <LinkButton to="/">トップへ戻る！</LinkButton>
      </div>
    </div>
  );
};

export { Complete };
