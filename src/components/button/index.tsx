import React from "react";
import styles from "./styles.module.scss";

type Props = React.ComponentPropsWithoutRef<"button">;

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  );
};

export { Button };
