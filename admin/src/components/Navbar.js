import React from "react";
import Message from "./SVG/Message";
import Notification from "./SVG/Notification";
import Wallet from "./SVG/Wallet";
import { Link } from "react-router-dom";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import Logo from "./../logo.svg";
import { checkuseraddress, Login, Logout, Register } from "./../apiServices";
import { NotificationManager } from "react-notifications";

import "react-notifications/lib/notifications.css";
import { useCookies } from "react-cookie";
import { slowRefresh } from "./../helpers/NotifyStatus";

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
  accountCenter: {
    desktop: {
      position: "topRight", // default: 'topRight'
      enabled: false
    }
  }
});

function Navbar(props) {
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const connectWallet = async () => {
    const wallets = await onboard.connectWallet();
    console.log("wallet address--->", wallets[0]);
    const primaryWallet = onboard.state.get();
    console.log("primaryWallet", primaryWallet);
    const success = await onboard.setChain({ chainId: "0x4" });
    console.log("setChain method", success);
    try {
      const address = wallets[0].accounts[0].address;
      try {
        const isUserExist = await checkuseraddress(address);
        setCookie("selected_account", address, { path: "/" });
        setCookie(
          "chain_id",
          parseInt(wallets[0].chains[0].id, 16).toString(),
          { path: "/" }
        );
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
  };

  const disconnectWallet = async () => {
    removeCookie("selected_account", { path: "/" });
    const currentState = onboard.state.get();
    const state = onboard.state.select();

    console.log("current state", currentState, state);
    // const primaryWallet = onboard.state.get().wallets[0];
    // console.log(primaryWallet.accounts[0].address);
    // const walletAddress = primaryWallet.accounts[0].address;
    await onboard.disconnectWallet({ label: "Metamask" });
    await Logout(cookies["selected_account"]);
    NotificationManager.success("User Logged out Successfully.");
    slowRefresh(1000);
  };

  const onLogin = async () => {
    const wallets = await onboard.connectWallet();
    console.log("wallet address--->", wallets[0]);
    const success = await onboard.setChain({ chainId: "0x4" });
    console.log("setChain method", success);
    try {
      const address = wallets[0].accounts[0].address;
      try {
        const isUserExist = await checkuseraddress(address);
        setCookie("selected_account", address, { path: "/" });
        setCookie(
          "chain_id",
          parseInt(wallets[0].chains[0].id, 16).toString(),
          { path: "/" }
        );
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

  return (
    <div className="admin-navbar d-flex w-100">
      <div className="profile_box text-light me-auto d-flex align-items-center text-uppercase montserrat font-400">
        <div className="profile_img">
          <img src={"../images/user.jpg"} alt="" className="img-fluid" />
        </div>
        {props.model} Decryptblock
      </div>
      <ul className="p-0 m-0">
        <li className="text-light">
          <div className="position-relative">
            <Message />
            <span className="badge badge-danger navbar-badge text-dark">3</span>
          </div>
        </li>
        <li className="text-light">
          <div className="position-relative">
            <Notification />
            <span className="badge badge-danger navbar-badge text-dark">3</span>
          </div>
        </li>
        <li>
          <Link
            to=''
            className="round-btn montserrat text-light text-decoration-none"
            onClick={!cookies["selected_account"] ? connectWallet : disconnectWallet}
          >
            {!cookies["selected_account"] ? (
              "Connect Wallet"
            ) : (
              <>
                <Wallet /> {cookies["selected_account"]}
              </>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
