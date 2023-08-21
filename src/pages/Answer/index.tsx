import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { useQueryQuestion } from "../../hooks/useQueryQuestion";
import { useAnswer } from "../../hooks/useAnswer";

const Answer: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useQueryQuestion();
  const { handleSubmit } = useAnswer();
  const [isError, setIsError] = useState(false);

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
    <form
      onSubmit={(e) => handleSubmit(e, setIsError)}
      className={styles.container}
    >
      <div>
        <h1 className={styles.heading}>まとめ</h1>
        <p className={styles.question}>Q. {data.question}</p>
        <div className={styles["label-area"]}>
          <label htmlFor="answer" className={styles.label}>
            あなたの考え
          </label>
        </div>
        <textarea
          id="answer"
          name="answer"
          className={clsx(
            styles["text-area"],
            isError && styles["text-area-error"]
          )}
        />
        {isError && (
          <p className={styles["error-message"]}>1文字以上入力してください。</p>
        )}
      </div>
      <div>
        <Button type="submit">答える！</Button>
      </div>
    </form>
  );
};

export { Answer };
