import React from "react";
import styles from "./styles.module.scss";

type Props = React.ComponentPropsWithoutRef<"a">;

const LinkButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <a {...rest} className={styles["link-button"]}>
      {children}
    </a>
  );
};

export { LinkButton };
