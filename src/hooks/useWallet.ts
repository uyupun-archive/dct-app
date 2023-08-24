import { ethers } from "ethers";
import ierc20 from "../assets/IERC20.json";

const useWallet = () => {
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

  async function getTokenBalance(
    providerUrl: string,
    tokenAddress: string,
    userAddress: string
  ): Promise<ethers.BigNumberish> {
    // プロバイダの初期化
    const provider = new ethers.JsonRpcProvider(providerUrl);

    // コントラクトのインスタンスを作成
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ierc20.abi,
      provider
    );

    // balanceOfメソッドを使用してトークンの残高を取得
    const balance = await tokenContract.balanceOf(userAddress);

    return balance;
  }

  return { sendToken, getTokenBalance };
};

export { useWallet };
