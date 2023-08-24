import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { LinkButton } from "../../components/LinkButton";
import { useAtom } from "jotai";
import { walletAtom } from "../../atoms/wallet";
import imgUrl from "../../assets/kangaeruhito.png";
import { stepCountAtom } from "../../atoms/stepCount";

const Top: React.FC = () => {
  const [wallet, setWallet] = useAtom(walletAtom);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [, setStepCount] = useAtom(stepCountAtom);

  useEffect(() => {
    setStepCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>
          Don’t cunning! <span className={styles["font-bold"]}>Think</span>.
        </h1>
        <img src={imgUrl} alt="考える人のイラスト" className={styles.image} />
      </div>
      <div className={styles["button-area"]}>
        <div className={styles.form}>
          <label htmlFor="address">ウォレットアドレス</label>
          <input
            id="address"
            type="text"
            className={styles["text-box"]}
            defaultValue={wallet.address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.form}>
          <label htmlFor="password">秘密鍵</label>
          <input
            id="password"
            type="password"
            className={styles["text-box"]}
            defaultValue={wallet.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="button"
          onClick={() => {
            setWallet({ address, password });
            alert("保存しました！");
          }}
        >
          ウォレットの保存
        </Button>
        <LinkButton type="button" to="/think">
          考える！
        </LinkButton>
      </div>
    </div>
  );
};

export { Top };
