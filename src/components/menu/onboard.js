import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import Logo from "./../../assets/images/logo.svg";
import { checkuseraddress, Login, Logout, Register } from "../../apiServices";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
// import { useCookies } from "react-cookie";
import { slowRefresh } from "./../../helpers/NotifyStatus";

const injected = injectedModule();
const walletConnect = walletConnectModule();

const onboard = Onboard({
  wallets: [walletConnect, injected],
  chains: [
    {
      id: "0x13881",
      token: "MATIC",
      label: "Mumbai matic testnet",
      rpcUrl: `https://rpc-mumbai.maticvigil.com`,
    },
    // {
    //   id: "0x1",
    //   token: "ETH",
    //   label: "Ethereum Mainnet",
    //   rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
    // },
    // {
    //   id: "0x3",
    //   token: "tROP",
    //   label: "Ethereum Ropsten Testnet",
    //   rpcUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
    // },
    {
      id: "0x4",
      token: "rETH",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: `https://rinkeby.infura.io/v3/59c3f3ded6a045b8a92d1ffb5c26e91f`,
    },
    {
      id: "0x38",
      token: "BNB",
      label: "Binance Smart Chain",
      rpcUrl: "https://bsc-dataseed.binance.org/",
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Matic Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
    {
      id: "0xfa",
      token: "FTM",
      label: "Fantom Mainnet",
      rpcUrl: "https://rpc.ftm.tools/",
    },
  ],
  appMetadata: {
    name: "DigitalArms",
    icon: Logo,
    logo: Logo,
    description: "DigitalArms using Onboard",
    agreement: {
      version: "1.0.0",
      termsUrl: "https://www.blocknative.com/terms-conditions",
      privacyUrl: "https://www.blocknative.com/privacy-policy",
    },
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: "Available Wallets",
        },
      },
    },
  },
});

const connectionDetails = {
  walletAddress: "",
  chainid: "",
};

export const openWalletSelectionmodal = async () => {
    console.log("In Connect wallet function");
    const success = await onboard.setChain({ chainId: "0x4" });
    console.log("setChain method", success);
    await onboard.connectWallet();
}

export const connectWallet = async () => {
  console.log("In Connect wallet function");
  console.log("wallet address--->", wallets[0]);
  const success = await onboard.setChain({ chainId: "0x4" });
  const wallets = await onboard.connectWallet();
  
  console.log("setChain method", success);
  try {
    const address = wallets[0].accounts[0].address;
    try {
      const isUserExist = await checkuseraddress(address);
      // setShowConnected(false);
      // setWalletAddress(address);
      connectionDetails = {
        walletAddress: address,
        chainId: success,
      };
      // setCookie("selected_account", address, { path: "/" });
      // setCookie(
      //   "chain_id",
      //   parseInt(wallets[0].chains[0].id, 16).toString(),
      //   { path: "/" }
      // );
      console.log("selected_account", address);
      console.log("isUserExist", isUserExist);
      if (isUserExist === "User not found") {
        try {
          const res = await Register(address);
          if (res.message === "Wallet Address required") {
            NotificationManager.info(res.message);
            return;
          } else if (res.message === "User already exists") {
            NotificationManager.error(res.message);
            return;
          } else {
            NotificationManager.success(res.message);
            slowRefresh(1000);
            return;
          }
        } catch (e) {
          NotificationManager.error(e);
          return;
        }
      } else {
        try {
          const res = await Login(address);
          console.log("Login API response", res);
          if (res.message === "Wallet Address required") {
            NotificationManager.info(res.message);
            return;
          } else if (
            res.message === "User not found" ||
            res.message === "Invalid Login"
          ) {
            NotificationManager.error(res.message);
            return;
          } else {
            NotificationManager.success(res.message);
            slowRefresh(3000);
            return;
          }
        } catch (e) {
          NotificationManager.error(e);
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("connectionDetails", connectionDetails);
  return connectionDetails;
};

const disconnectWallet = async () => {
//   removeCookie("selected_account", { path: "/" });
  const currentState = onboard.state.get();
  const state = onboard.state.select();

  console.log("current state", currentState, state);
  // const primaryWallet = onboard.state.get().wallets[0];
  // console.log(primaryWallet.accounts[0].address);
  // const walletAddress = primaryWallet.accounts[0].address;
  await onboard.disconnectWallet({ label: "Metamask" });
  await Logout(cookies["selected_account"]);

//   setShowConnected(true);
  NotificationManager.success("User Logged out Successfully.");
  slowRefresh(1000);
};

export const onLogin = async () => {
  const wallets = await onboard.connectWallet();
  console.log("wallet address--->", wallets[0]);
  const success = await onboard.setChain({ chainId: "0x4" });
  console.log("setChain method", success);
  try {
    const address = wallets[0].accounts[0].address;
    try {
      const isUserExist = await checkuseraddress(address);
    //   setShowConnected(false);
    //   setWalletAddress(address);
    //   setCookie("selected_account", address, { path: "/" });
    //   setCookie("chain_id", parseInt(wallets[0].chains[0].id, 16).toString(), {
    //     path: "/",
    //   });
      console.log("selected_account", address);
      console.log("isUserExist", isUserExist);
      if (isUserExist === "User Found successfully") {
        try {
          const res = await Login(address);
          console.log("Login API response", res);
          if (res.message === "Wallet Address required") {
            NotificationManager.info(res.message);
            return;
          } else if (
            res.message === "User not found" ||
            res.message === "Invalid Login"
          ) {
            NotificationManager.error(res.message);
            return;
          } else {
            NotificationManager.success(res.message);
            slowRefresh(3000);
            return;
          }
        } catch (e) {
          NotificationManager.error(e);
          return;
        }
      } else {
        NotificationManager.error(isUserExist);
      }
    } catch (e) {
      NotificationManager.error(e);
    }
  } catch (e) {
    NotificationManager.error(e);
  }
};
