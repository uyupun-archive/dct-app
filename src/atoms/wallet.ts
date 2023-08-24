import { atomWithStorage } from "jotai/utils";

const walletAtom = atomWithStorage("wallet", { address: "", password: "" });

export { walletAtom };
