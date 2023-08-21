import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { useQueryQuestion } from "../../hooks/useQueryQuestion";

const Answer: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useQueryQuestion();

  useEffect(() => {
    if (data === null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data === null) {
    return <></>;
  }

  return (
    <form onSubmit={() => {}} className={styles.container}>
      <div>
        <h1 className={styles.heading}>まとめ</h1>
        <p className={styles.question}>Q. {data.question}</p>
        <div className={styles["label-area"]}>
          <label htmlFor="answer" className={styles.label}>
            あなたの考え
          </label>
        </div>
        <textarea id="answer" name="answer" className={styles["text-area"]} />
      </div>
      <div>
        <Button type="submit">答える！</Button>
      </div>
    </form>
  );
};

export { Answer };
