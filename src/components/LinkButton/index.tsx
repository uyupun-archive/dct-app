import React from "react";
import styles from "./styles.module.scss";
import { Link, LinkProps } from "react-router-dom";

const LinkButton: React.FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <Link {...rest} className={styles["link-button"]}>
      {children}
    </Link>
  );
};

export { LinkButton };
