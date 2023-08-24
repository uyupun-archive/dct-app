import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { LinkButton } from "../../components/LinkButton";
import { useAtom } from "jotai";
import { walletAtom } from "../../atoms/wallet";
import imgUrl from "../../assets/kangaeruhito.png";
import { stepCountAtom } from "../../atoms/stepCount";
import { useWallet } from "../../hooks/useWallet";

const Top: React.FC = () => {
  const [wallet, setWallet] = useAtom(walletAtom);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState<string>("");
  const [, setStepCount] = useAtom(stepCountAtom);
  const { getTokenBalance } = useWallet();

  const getBalance = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const address = JSON.parse(
      localStorage.getItem("wallet") as string
    ).address;
    console.log("address: " + address);
    if (typeof address === "string") {
      const providerUrl = import.meta.env.VITE_ALCHEMY_API_URL;
      const tokenContractAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS;
      try {
        const tokenBalance = await getTokenBalance(
          providerUrl,
          tokenContractAddress,
          address
        );
        setBalance(String(tokenBalance));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    setStepCount(0);
    getBalance();
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
        <p>
          残高:{" "}
          {`${Number(
            balance.substring(0, balance.length - 18)
          ).toLocaleString()}`}
          CNG
        </p>
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
          onClick={async () => {
            setWallet({ address, password });
            await getBalance();
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
