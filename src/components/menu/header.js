import React, { useEffect, useState } from "react";
import { setDefaultBreakpoints } from "react-socks";
// import useOnclickOutside from "react-cool-onclickoutside";
// import AccountModal from "./../components/AccountModal/Accountmodal";
import { Link, NavLink } from "react-router-dom";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import Logo from "./../../assets/images/logo.svg";
import { checkuseraddress, Login, Logout, Register } from "../../apiServices";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useCookies } from "react-cookie";
import AllNFTs from "../SVG/AllNFTs";
import Soldierssvg from "../SVG/Soldierssvg";
import HotListsvg from "../SVG/HotListsvg";
import NFTrankingsvg from "../SVG/NFTrankingsvg";
import LiveAuctonsvg from "../SVG/LiveAuctonsvg";
import Firearmsvg from "../SVG/Firearmsvg";

import { slowRefresh } from "./../../helpers/NotifyStatus";
import PopupModal from "./../components/AccountModal/popupModal";
import "./../components-css/App.css";


setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const injected = injectedModule();
const walletConnect = walletConnectModule();

const onboard = Onboard({
  wallets: [walletConnect, injected],
  chains: [
    {
      id: "0x13881",
      token: "MATIC",
      label: "Mumbai matic testnet",
      rpcUrl: `https://rpc-mumbai.maticvigil.com/`,
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
      enabled: false,
    },
  },
});

const Header = function () {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [isAccountSwitched, setIsAccountSwitched] = useState(false);
  const [isChainSwitched, setIsChainSwitched] = useState(false);

  useEffect(() => {
    if (cookies["selected_account"]) {
      setAccount(cookies["selected_account"]);
    } else refreshState();
  }, []);

  const refreshState = () => {
    setAccount("");
    setChainId("");
    setProvider(null);
  };

  useEffect(() => {
    console.log("provider in useEffect", provider);
    if (provider) {
      provider.on("accountsChanged", (accounts) => {
        console.log("account switched!!", accounts[0]);
        setIsAccountSwitched(true);
      });
      provider.on("chainChanged", (chains) => {
        console.log("chain changed", chains);
        if(chains !== "0x4")
        setIsChainSwitched(true);
      });
    }
  }, [provider]);

  const connectWallet = async () => {
    setIsAccountSwitched(false);
    const wallets = await onboard.connectWallet();
    console.log("wallet address--->", wallets[0]);
    const success = await onboard.setChain({ chainId: "0x4" });
    console.log("setChain method", success);
    const primaryWallet = wallets[0];
    setAccount(primaryWallet.accounts[0].address);
    setChainId(primaryWallet.chains[0].id);
    console.log("provider", primaryWallet.provider);
    setProvider(primaryWallet.provider);
    console.log("provider", provider);

    try {
      const address = wallets[0].accounts[0].address;
      setCookie("selected_account", address, { path: "/" });
      setCookie("chain_id", parseInt(wallets[0].chains[0].id, 16).toString(), {
        path: "/",
      });
      setCookie("balance", wallets[0].accounts[0].balance, { path: "/" });
      try {
        const isUserExist = await checkuseraddress(address);
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
    removeCookie("chain_id", { path: "/" });
    removeCookie("balance", { path: "/" });

    // const [primaryWallet] = await onboard.state.get().wallets;
    // if (!primaryWallet) return;
    await onboard.disconnectWallet({ label: "Metamask" });
    await Logout(cookies["selected_account"]);
    refreshState();
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
    <header id="myHeader">
      {isAccountSwitched ? (
        <PopupModal
          content={
            <div className="switch_container">
              <h3>Account Switched</h3>
              <p className="my-4 mr-2">Would you like to switch the account?</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn confirm_btn"
                  onClick={() => {
                    disconnectWallet();
                  }}
                >
                  Confirm
                </button>
                <button
                  className="btn cancel_btn"
                  onClick={() => setIsAccountSwitched(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          }
          handleClose={() => setIsAccountSwitched(false)}
        />
      ) : (
        ""
      )}
      {isChainSwitched ? (
        <PopupModal
          content={
            <div className="switch_container">
              <h3>Chain Switched</h3>
              <p className="my-4 mr-2">
                Please Switch to Rinkeby Testnet Network
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn network_btn"
                  onClick={async () => {
                    await onboard.setChain({ chainId: "0x4" });
                    setIsChainSwitched(false);
                  }}
                >
                  Switch Network
                </button>
              </div>
            </div>
          }
          handleClose={() => setIsChainSwitched(false)}
        />
      ) : (
        ""
      )}
      <nav className="navbar navbar-expand-lg">
        <div className="nav-container container">
          <Link className="navbar-brand" to="/">
            <img src={"../img/logo.svg"} className="img-fluid d-block" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex navbar_form">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search item here..."
                aria-label="Search"
              />
              <button className="search_btn" type="submit">
                <img src={"../img/search.svg"} alt="" />
              </button>
            </form>
            <ul className='navbar-nav me-auto align-items-center mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink 
                  className='nav-link'
                  aria-current='page'
                  to='/marketplace'>
                  Market Place
                </NavLink>
                <ul className='sub_menu'>
                  <li>
                    <NavLink to={'/AllNFTs'} className='sub-items'>
                      <AllNFTs />
                      All NFTs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/Firearms'} className='sub-items'>
                      <Firearmsvg />
                      Firearms
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/Soldiers'} className='sub-items'>
                      <Soldierssvg />
                      Soldiers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/Accesories'} className='sub-items'>
                      <Soldierssvg />
                      Accesories
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to={'/'} className='sub-items'>
                      <HotListsvg />
                      Hot List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/NFTdetails"} className='sub-items'>
                      <NFTrankingsvg />
                      NFT Ranking
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/'} className='sub-items'>
                      <LiveAuctonsvg />
                      Live Auctions
                    </NavLink>
                  </li> */}
                </ul>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to={"/collection"}>
                  Collections
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/Resources' tabindex='-1'>
                  Resources
                  <ul className="sub_menu">
                    <li>
                      <NavLink to={"/helpcenter"} className='sub-items'>
                        Help Center
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={'/Partners'} className='sub-items'>
                        Partners
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/blog"} className='sub-items'>
                        Blog
                      </NavLink>
                    </li>
                    <ul className="subsocial-icons mt-3">
                      <li>
                        <NavLink to={''}>
                          <i className='fa fa-facebook fa-lg'></i>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={''}>
                          <i className='fa fa-twitter fa-lg'></i>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={''}>
                          <i className='fa fa-linkedin fa-lg'></i>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={''}>
                          <i className='fa fa-pinterest fa-lg'></i>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={''}>
                          <i className='fa fa-rss fa-lg'></i>
                        </NavLink>
                      </li>
                    </ul>
                  </ul>
                </NavLink>
              </li>
              <li className="nav-item">
                {!account ? (
                  <NavLink className="border_btn" onClick={onLogin} to="">
                    log in
                  </NavLink>
                ) : (
                  ""
                )}

              </li>
              <li className="nav-item">
                <Link
                  onClick={!account ? connectWallet : disconnectWallet}
                  className="main_btn"
                  to=""
                  tabindex="-1"
                >
                  {!account
                    ? "Connect Wallet"
                    : account.slice(0, 4) + "..." + account.slice(38, 42)}
                </Link>
              </li>
            </ul>
            {/* <p>expand object select mention floor lumber unaware already narrow industry visit bundle</p> */}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
