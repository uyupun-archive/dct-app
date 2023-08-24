import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { LinkButton } from "../../components/LinkButton";
import { ethers } from "ethers";
import ierc20 from "../../assets/IERC20.json";
import { useAtom } from "jotai";
import { walletAtom } from "../../atoms/wallet";

const providerUrl = import.meta.env.VITE_ALCHEMY_API_URL;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const tokenContractAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS;
const recipientAddress = import.meta.env.VITE_RECIPIENT_ADDRESS;
const amount = "100";

async function sendToken(
  providerUrl: string,
  privateKey: string,
  tokenAddress: string,
  toAddress: string,
  amount: string
) {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const tokenContract = new ethers.Contract(
    tokenAddress,
    ierc20.abi,
    provider
  ).connect(wallet);

  const signer = new ethers.Wallet(privateKey, provider);

  // トークンの小数点以下の桁数を考慮して、正しい値に変換します
  const amountParsed = ethers.parseUnits(amount, 18);

  const data = tokenContract.interface.encodeFunctionData("transfer", [
    toAddress,
    amountParsed,
  ]);

  const tx = await signer.sendTransaction({
    to: tokenContract,
    from: signer.address,
    value: ethers.parseUnits("0.000", "ether"),
    data: data,
  });

  console.log("Mining transaction...");

  // Waiting for the transaction to be mined
  const receipt = await tx.wait();

  console.log(receipt);

  return receipt;
}

const Top: React.FC = () => {
  const [, setWallet] = useAtom(walletAtom);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>
          Don’t cunning! <span className={styles["font-bold"]}>Think</span>.
        </h1>
      </div>
      <div className={styles["button-area"]}>
        <Button
          type="button"
          onClick={async () => {
            await sendToken(
              providerUrl,
              privateKey,
              tokenContractAddress,
              recipientAddress,
              amount
            )
              .then((receipt) => {
                console.log(
                  `Transaction successful with hash: ${receipt?.hash}`
                );
              })
              .catch((error) => {
                console.error("Error sending tokens:", error);
              });
          }}
        >
          送金
        </Button>
        <div className={styles.form}>
          <label htmlFor="address">ウォレットアドレス</label>
          <input
            id="address"
            type="text"
            className={styles["text-box"]}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.form}>
          <label htmlFor="password">秘密鍵</label>
          <input
            id="password"
            type="password"
            className={styles["text-box"]}
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
