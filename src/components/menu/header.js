import React, { useEffect, useState } from "react";
import { setDefaultBreakpoints } from "react-socks";
// import useOnclickOutside from "react-cool-onclickoutside";
// import AccountModal from "./../components/AccountModal/Accountmodal";
import { Link } from "react-router-dom";
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
import { useCookies } from "react-cookie";
import { slowRefresh } from "./../../helpers/NotifyStatus";

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

const Header = function () {
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
    <header id='myHeader'>
      <NotificationContainer />
      <nav className='navbar navbar-expand-lg'>
        <div className='nav-container container'>
          <Link className='navbar-brand' to='/'>
            <img src={"../img/logo.svg"} className='img-fluid d-block' alt='' />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <form className='d-flex navbar_form'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search item here...'
                aria-label='Search'
              />
              <button className='search_btn' type='submit'>
                <img src={"../img/search.svg"} alt='' />
              </button>
            </form>
            <ul className='navbar-nav me-auto align-items-center mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/marketplace'>
                  Market Place
                </Link>
                <ul className='sub_menu'>
                  <li>
                    <Link to='' className='active sub-items'>
                      <svg
                        width='23'
                        height='23'
                        viewBox='0 0 23 23'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M0.5625 2.125C0.5625 1.7106 0.72712 1.31317 1.02015 1.02015C1.31317 0.72712 1.7106 0.5625 2.125 0.5625H5.25C5.6644 0.5625 6.06183 0.72712 6.35485 1.02015C6.64788 1.31317 6.8125 1.7106 6.8125 2.125V5.25C6.8125 5.6644 6.64788 6.06183 6.35485 6.35485C6.06183 6.64788 5.6644 6.8125 5.25 6.8125H2.125C1.7106 6.8125 1.31317 6.64788 1.02015 6.35485C0.72712 6.06183 0.5625 5.6644 0.5625 5.25V2.125ZM8.375 2.125C8.375 1.7106 8.53962 1.31317 8.83265 1.02015C9.12567 0.72712 9.5231 0.5625 9.9375 0.5625H13.0625C13.4769 0.5625 13.8743 0.72712 14.1674 1.02015C14.4604 1.31317 14.625 1.7106 14.625 2.125V5.25C14.625 5.6644 14.4604 6.06183 14.1674 6.35485C13.8743 6.64788 13.4769 6.8125 13.0625 6.8125H9.9375C9.5231 6.8125 9.12567 6.64788 8.83265 6.35485C8.53962 6.06183 8.375 5.6644 8.375 5.25V2.125ZM16.1875 2.125C16.1875 1.7106 16.3521 1.31317 16.6451 1.02015C16.9382 0.72712 17.3356 0.5625 17.75 0.5625H20.875C21.2894 0.5625 21.6868 0.72712 21.9799 1.02015C22.2729 1.31317 22.4375 1.7106 22.4375 2.125V5.25C22.4375 5.6644 22.2729 6.06183 21.9799 6.35485C21.6868 6.64788 21.2894 6.8125 20.875 6.8125H17.75C17.3356 6.8125 16.9382 6.64788 16.6451 6.35485C16.3521 6.06183 16.1875 5.6644 16.1875 5.25V2.125ZM0.5625 9.9375C0.5625 9.5231 0.72712 9.12567 1.02015 8.83265C1.31317 8.53962 1.7106 8.375 2.125 8.375H5.25C5.6644 8.375 6.06183 8.53962 6.35485 8.83265C6.64788 9.12567 6.8125 9.5231 6.8125 9.9375V13.0625C6.8125 13.4769 6.64788 13.8743 6.35485 14.1674C6.06183 14.4604 5.6644 14.625 5.25 14.625H2.125C1.7106 14.625 1.31317 14.4604 1.02015 14.1674C0.72712 13.8743 0.5625 13.4769 0.5625 13.0625V9.9375ZM8.375 9.9375C8.375 9.5231 8.53962 9.12567 8.83265 8.83265C9.12567 8.53962 9.5231 8.375 9.9375 8.375H13.0625C13.4769 8.375 13.8743 8.53962 14.1674 8.83265C14.4604 9.12567 14.625 9.5231 14.625 9.9375V13.0625C14.625 13.4769 14.4604 13.8743 14.1674 14.1674C13.8743 14.4604 13.4769 14.625 13.0625 14.625H9.9375C9.5231 14.625 9.12567 14.4604 8.83265 14.1674C8.53962 13.8743 8.375 13.4769 8.375 13.0625V9.9375ZM16.1875 9.9375C16.1875 9.5231 16.3521 9.12567 16.6451 8.83265C16.9382 8.53962 17.3356 8.375 17.75 8.375H20.875C21.2894 8.375 21.6868 8.53962 21.9799 8.83265C22.2729 9.12567 22.4375 9.5231 22.4375 9.9375V13.0625C22.4375 13.4769 22.2729 13.8743 21.9799 14.1674C21.6868 14.4604 21.2894 14.625 20.875 14.625H17.75C17.3356 14.625 16.9382 14.4604 16.6451 14.1674C16.3521 13.8743 16.1875 13.4769 16.1875 13.0625V9.9375ZM0.5625 17.75C0.5625 17.3356 0.72712 16.9382 1.02015 16.6451C1.31317 16.3521 1.7106 16.1875 2.125 16.1875H5.25C5.6644 16.1875 6.06183 16.3521 6.35485 16.6451C6.64788 16.9382 6.8125 17.3356 6.8125 17.75V20.875C6.8125 21.2894 6.64788 21.6868 6.35485 21.9799C6.06183 22.2729 5.6644 22.4375 5.25 22.4375H2.125C1.7106 22.4375 1.31317 22.2729 1.02015 21.9799C0.72712 21.6868 0.5625 21.2894 0.5625 20.875V17.75ZM8.375 17.75C8.375 17.3356 8.53962 16.9382 8.83265 16.6451C9.12567 16.3521 9.5231 16.1875 9.9375 16.1875H13.0625C13.4769 16.1875 13.8743 16.3521 14.1674 16.6451C14.4604 16.9382 14.625 17.3356 14.625 17.75V20.875C14.625 21.2894 14.4604 21.6868 14.1674 21.9799C13.8743 22.2729 13.4769 22.4375 13.0625 22.4375H9.9375C9.5231 22.4375 9.12567 22.2729 8.83265 21.9799C8.53962 21.6868 8.375 21.2894 8.375 20.875V17.75ZM16.1875 17.75C16.1875 17.3356 16.3521 16.9382 16.6451 16.6451C16.9382 16.3521 17.3356 16.1875 17.75 16.1875H20.875C21.2894 16.1875 21.6868 16.3521 21.9799 16.6451C22.2729 16.9382 22.4375 17.3356 22.4375 17.75V20.875C22.4375 21.2894 22.2729 21.6868 21.9799 21.9799C21.6868 22.2729 21.2894 22.4375 20.875 22.4375H17.75C17.3356 22.4375 16.9382 22.2729 16.6451 21.9799C16.3521 21.6868 16.1875 21.2894 16.1875 20.875V17.75Z'
                          fill='white'
                        />
                      </svg>
                      All NFTs
                    </Link>
                  </li>
                  <li>
                    <Link to='' className='sub-items'>
                      <svg
                        width='23'
                        height='25'
                        viewBox='0 0 23 25'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M22.4344 0.214526C22.1483 -0.0715088 21.6846 -0.0715088 21.3986 0.214526L20.4191 1.19397L19.9012 0.67605C19.6152 0.390014 19.1514 0.390014 18.8654 0.67605C18.5794 0.962085 18.5794 1.42581 18.8654 1.71184L19.3833 2.22976L12.9951 8.61799L11.9593 7.5822L10.9235 8.61799L11.9593 9.65378L8.85189 12.7612L7.8161 11.7254L6.78031 12.7612L7.8161 13.797L5.74452 15.8686C5.64228 15.9708 5.5726 16.101 5.54423 16.2428L5.29472 17.4904L4.04716 17.7399C3.90536 17.7683 3.77514 17.838 3.67289 17.9402L1.60131 20.0118C0.935004 20.6781 0.934955 21.7623 1.60131 22.4286L3.67289 24.5002C4.33925 25.1666 5.42343 25.1665 6.08979 24.5002L9.88773 20.7023C9.98998 20.6 10.0597 20.4698 10.088 20.328L10.5905 17.8156L12.495 18.7678C12.7769 18.9088 13.1175 18.8535 13.3404 18.6306L15.412 16.5591C15.698 16.273 15.698 15.8093 15.412 15.5233L13.8583 13.9696L14.6729 13.155C15.3092 12.5186 15.5838 11.6118 15.4073 10.7293L14.9986 8.68601L22.4344 1.25037C22.7204 0.964331 22.7204 0.500561 22.4344 0.214526ZM13.8583 16.0412L12.6779 17.2216L11.2968 16.5311L12.8225 15.0054L13.8583 16.0412Z'
                          fill='#EF981D'
                        />
                        <path
                          d='M3.67297 14.8327C3.95901 14.5467 3.95901 14.083 3.67297 13.797L4.70876 12.7612L2.63713 10.6896L1.60139 11.7254C1.31536 11.4393 0.851636 11.4393 0.5656 11.7254C0.279565 12.0114 0.279565 12.4751 0.5656 12.7612L2.63718 14.8327C2.92322 15.1188 3.38694 15.1188 3.67297 14.8327Z'
                          fill='#EF981D'
                        />
                        <path
                          d='M13.1677 4.30222C13.4538 4.01619 13.4538 3.55247 13.1677 3.26643L12.1319 2.23064C11.8459 1.9446 11.3822 1.9446 11.0961 2.23064L3.67285 9.65388L5.74444 11.7255L13.1677 4.30222Z'
                          fill='#EF981D'
                        />
                      </svg>
                      Firearms
                    </Link>
                  </li>
                  <li>
                    <Link to='' className='sub-items'>
                      <svg
                        width='21'
                        height='25'
                        viewBox='0 0 21 25'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M15.4827 16.9436L14.978 18.0908C16.0487 18.5504 17.0857 19.0847 18.0815 19.6896L18.7179 18.6112C17.681 17.9783 16.5998 17.421 15.4827 16.9436H15.4827ZM4.7461 16.9436C3.63289 17.4228 2.55496 17.98 1.52036 18.6112L2.14732 19.6896C3.14378 19.0896 4.18077 18.5596 5.25078 18.1034L4.7461 16.9436ZM5.0345 15.8746L5.20063 15.9466L9.34482 17.7397L9.56115 17.8308V25H0V19.9843C0.00808294 19.5965 0.102277 19.2153 0.275767 18.8683C0.449258 18.5214 0.697706 18.2173 1.00313 17.9781C2.24106 17.0905 3.59828 16.3823 5.03449 15.8746H5.0345ZM15.047 15.8683C16.4989 16.3283 17.8576 17.0426 19.0596 17.9779C19.365 18.2172 19.6134 18.5213 19.7869 18.8683C19.9604 19.2153 20.0546 19.5965 20.0627 19.9843V25H10.5015V17.8308L10.7178 17.7398L14.8683 15.9466L15.047 15.8683L15.047 15.8683ZM13.4545 14.2007L14.6144 15.3699L10.5016 17.1473V15.2695L13.4546 14.2007L13.4545 14.2007ZM6.60815 14.2007L9.5611 15.2695V17.1504L5.94354 15.5862L5.44826 15.3699L6.60815 14.2007ZM7.22886 8.38558H12.8307C13.1078 8.3851 13.3821 8.44036 13.6374 8.54806C13.8927 8.65577 14.1236 8.81373 14.3166 9.01254C14.5188 9.22218 14.7607 9.38951 15.0282 9.5048C14.9501 10.7795 14.3886 11.9764 13.4583 12.8514C12.5281 13.7264 11.299 14.2135 10.0219 14.2135C8.74484 14.2135 7.51584 13.7264 6.58557 12.8514C5.6553 11.9764 5.09383 10.7795 5.01567 9.5048C5.28878 9.39138 5.53616 9.22394 5.74295 9.01254C5.93572 8.81346 6.16668 8.65532 6.422 8.5476C6.67732 8.43987 6.95175 8.38476 7.22886 8.38558H7.22886ZM9.94981 0H10.1128C13.5611 0 16.0689 2.74295 16.0689 4.78056V5.5361C16.2257 6.93737 16.3417 7.26963 16.9811 8.40436C16.7029 8.64206 16.3471 8.76924 15.9812 8.76171C15.6154 8.75419 15.265 8.61248 14.9968 8.36354C14.7162 8.07254 14.3797 7.84119 14.0075 7.68338C13.6353 7.52557 13.235 7.44454 12.8307 7.44514H7.23195C6.82743 7.44496 6.42704 7.52651 6.05482 7.68489C5.68259 7.84326 5.3462 8.07521 5.06583 8.36681C4.7976 8.61571 4.44728 8.75738 4.08144 8.76491C3.7156 8.77243 3.35975 8.64528 3.08151 8.40763C3.08151 8.40763 3.90597 7.44514 3.99373 5.5361V4.78056C3.99373 2.74295 6.50157 0 9.94984 0H9.94981Z'
                          fill='#EF981D'
                        />
                      </svg>
                      Soldiers
                    </Link>
                  </li>
                  <li>
                    <Link to='' className='sub-items'>
                      <svg
                        width='22'
                        height='25'
                        viewBox='0 0 22 25'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M14.6798 0.864611C14.5808 0.666227 14.4407 0.491193 14.2688 0.351142C14.0969 0.21109 13.8971 0.109229 13.6828 0.0523271C13.4685 -0.00457466 13.2446 -0.0152135 13.0258 0.0211174C12.8071 0.0574483 12.5986 0.139917 12.4142 0.263042C11.8751 0.622421 11.4548 1.13493 11.1298 1.63806C10.7954 2.15369 10.5001 2.75213 10.2392 3.38182C9.71729 4.63809 9.27979 6.14435 8.92666 7.65374C8.4996 9.49828 8.17979 11.366 7.96884 13.2475C7.3331 12.8377 6.82229 12.2609 6.49226 11.5803C5.97975 10.5178 5.87038 9.18344 5.87038 7.43343C5.87031 7.12444 5.77864 6.82241 5.60694 6.56551C5.43525 6.30862 5.19124 6.1084 4.90577 5.99016C4.6203 5.87193 4.30618 5.84099 4.00312 5.90125C3.70007 5.96151 3.42168 6.11027 3.20316 6.32873C2.18622 7.34348 1.37975 8.54913 0.830059 9.87643C0.280367 11.2037 -0.00171582 12.6266 7.85184e-06 14.0632C0.000137635 15.8618 0.443835 17.6327 1.2918 19.2189C2.13976 20.8051 3.36582 22.1577 4.86138 23.1569C6.35694 24.1561 8.07584 24.7711 9.86583 24.9474C11.6558 25.1236 13.4616 24.8557 15.1234 24.1674C16.7851 23.479 18.2514 22.3915 19.3925 21.0012C20.5335 19.6108 21.3141 17.9605 21.665 16.1964C22.0159 14.4324 21.9264 12.609 21.4044 10.8877C20.8823 9.16653 19.9438 7.60063 18.6721 6.32873C17.7471 5.40528 17.1408 4.78965 16.5658 4.03652C15.9986 3.29276 15.4345 2.37556 14.6798 0.864611ZM14.2501 20.5007C13.5946 21.1555 12.7597 21.6013 11.851 21.7818C10.9422 21.9623 10.0004 21.8695 9.14433 21.515C8.2883 21.1606 7.5565 20.5604 7.04138 19.7903C6.52625 19.0202 6.25088 18.1147 6.25007 17.1882C6.25007 17.1882 7.62352 17.9695 10.1564 17.9695C10.1564 16.407 10.9376 11.7194 12.1095 10.9381C12.8908 12.5007 13.3376 12.9585 14.2517 13.8741C14.6877 14.3088 15.0335 14.8253 15.2692 15.3941C15.5049 15.9628 15.6259 16.5726 15.6252 17.1882C15.6259 17.8039 15.5049 18.4136 15.2692 18.9823C15.0335 19.5511 14.6877 20.0676 14.2517 20.5023L14.2501 20.5007Z'
                          fill='#EF981D'
                        />
                      </svg>
                      Hot List
                    </Link>
                  </li>
                  <li>
                    <Link to={"/NFTdetails"} className='sub-items'>
                      <svg
                        width='30'
                        height='27'
                        viewBox='0 0 30 27'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M10.0278 9.33337H1V26H10.0278V9.33337Z'
                          stroke='#EF981D'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M19.0556 1H10.0278V26H19.0556V1Z'
                          stroke='#EF981D'
                          stroke-width='2'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M28.0834 14.8889H19.0557V26H28.0834V14.8889Z'
                          stroke='#EF981D'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </svg>
                      NFT Ranking
                    </Link>
                  </li>
                  <li>
                    <Link to='' className='sub-items'>
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M14.0753 22.6541V25H0V22.6541H14.0753ZM14.7626 0L23.8857 9.12311L22.2272 10.784L20.9839 10.3688L18.0785 13.2706L24.7138 19.9059L23.0553 21.5645L16.4211 14.9292L13.6014 17.7489L13.9333 19.0767L12.2736 20.7352L3.15051 11.6121L4.81022 9.95355L6.13564 10.2843L13.5181 2.90302L13.1041 1.65971L14.7626 0Z'
                          fill='#EF981D'
                        />
                      </svg>
                      Live Auctions
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={"/marketplace"}>
                  Collections
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='' tabindex='-1'>
                  Resources
                  <ul className='sub_menu'>
                    <li>
                      <Link to={"/helpcenter"} className='active sub-items'>
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link to='' className='sub-items'>
                        Partners
                      </Link>
                    </li>
                    <li>
                      <Link to={"/blog"} className='sub-items'>
                        Blog
                      </Link>
                    </li>
                    <ul className='subsocial-icons mt-3'>
                      <li>
                        <Link to=''>
                          <i className='fa fa-facebook fa-lg'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to=''>
                          <i className='fa fa-twitter fa-lg'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to=''>
                          <i className='fa fa-linkedin fa-lg'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to=''>
                          <i className='fa fa-pinterest fa-lg'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to=''>
                          <i className='fa fa-rss fa-lg'></i>
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </Link>
              </li>
              <li className='nav-item'>
                {!cookies["selected_account"] ? (
                  <Link className='border_btn' onClick={onLogin} to=''>
                    log in
                  </Link>
                ) : (
                  ""
                )}
              </li>
              <li className='nav-item'>
                <Link
                  onClick={
                    !cookies["selected_account"]
                      ? connectWallet
                      : disconnectWallet
                  }
                  className='main_btn'
                  to=''
                  tabindex='-1'>
                  {!cookies["selected_account"]
                    ? "Connect Wallet"
                    : cookies["selected_account"].slice(0, 4) +
                      "..." +
                      cookies["selected_account"].slice(38, 42)}
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
