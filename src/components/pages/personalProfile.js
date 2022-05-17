/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useEffect, useState } from "react";
import ColumnZero from "../components/ColumnZero";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { getProfile } from "../../apiServices";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Avatar from "./../../assets/images/avatar5.jpg";
import { NotificationManager } from "react-notifications";
import "../components-css/profile-page.css";
import {
  nftListParamsUpdate,
  userProfileDataLoaded,
} from "../../redux/actions";
import { BsPencilSquare } from "react-icons/bs";
import GeneralCollectionsPage from "../components/GeneralCollectionsPage";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const PersonalProfile = function (props) {
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);
  const [openMenu4, setOpenMenu4] = useState(false);
  const [profilePic, setProfilePic] = useState(Avatar);
  const [fullName, setFullName] = useState("Unnamed");
  const [userName, setUserName] = useState("@unnamed");
  const [address, setAddress] = useState("0x0..");
  const [authorization, setAuthorization] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    setAuthorization(localStorage.getItem("Authorization"));
    props.dispatch(
      nftListParamsUpdate({
        paramType: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("Authorization")]);

  useEffect(() => {
    async function fetchData() {
      if ((props.token && props.token.token) || authorization) {
        setLoading(true);
        const profileInfo = await getProfile();
        if (profileInfo && profileInfo.data) {
          let profileData = profileInfo.data;
          if (
            profileData.oName &&
            profileData.oName.sFirstname &&
            profileData.oName.sLastname
          ) {
            setFullName(
              profileData.oName.sFirstname + " " + profileData.oName.sLastname
            );
          } else {
            setFullName("Unnamed");
          }

          if (profileData.sUserName) {
            setUserName("@" + profileData.sUserName);
          } else {
            setUserName("@unnamed");
          }

          if (profileData.sWalletAddress) {
            setAddress(profileData.sWalletAddress);
          } else if (props.account && props.account.account) {
            setAddress(props.account.account);
          } else {
            setAddress("0x0..");
          }

          let sProfilePicUrl =
            profileData.sProfilePicUrl === undefined
              ? Avatar
              : "https://decryptnft.mypinata.cloud/ipfs/" +
                profileData.sProfilePicUrl;
          setProfilePic(sProfilePicUrl);
          setProfileData(profileData);
          setLoading(false);
        }
      }
    }
    if ((props.token && props.token.token) || authorization) fetchData();
  }, [props.token, authorization, props.account]);

  useEffect(() => {
    props.dispatch(
      userProfileDataLoaded({
        profileData: profileData,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    props.dispatch(
      nftListParamsUpdate({
        paramType: 0,
      })
    );
  };

  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    props.dispatch(
      nftListParamsUpdate({
        paramType: 1,
      })
    );
  };

  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    props.dispatch(
      nftListParamsUpdate({
        paramType: 2,
      })
    );
  };

  const handleBtnClick3 = () => {
    setOpenMenu(false);
    setOpenMenu2(false);
    setOpenMenu1(false);
    setOpenMenu3(!openMenu3);
    setOpenMenu4(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    props.dispatch(
      nftListParamsUpdate({
        paramType: 3,
      })
    );
  };

  const handleBtnClick4 = () => {
    setOpenMenu(false);
    setOpenMenu2(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(!openMenu4);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.add("active");
    props.dispatch(
      nftListParamsUpdate({
        paramType: 4,
      })
    );
  };

  return loading ? (
    "Loading"
  ) : (
    <div>
      <GlobalStyles />
      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${"./img/author_single/author_banner.jpg"})`,
        }}
      >
        <div className="mainbreadcumb"></div>
      </section>
      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <img src={profilePic ? profilePic : ""} alt="" />
                  <i className="fa fa-check"></i>
                  <div className="profile_name">
                    <h4>
                      <div className="d-flex">
                        {fullName}
                        <BsPencilSquare
                          className="BsPencilSquare"
                          onClick={() => {
                            window.location.href = "/updateProfile";
                          }}
                        />
                      </div>
                      <span className="profile_username">
                        {userName ? userName : "@unnamed"}
                      </span>
                      <span id="wallet" className="profile_wallet">
                        {address ? address : "0x00.."}
                      </span>
                      <CopyToClipboard
                        text={address}
                        onCopy={() => {
                          NotificationManager.success("Copied!!");
                        }}
                      >
                        <button id="btn_copy" title="Copy Text">
                          Copy
                        </button>
                      </CopyToClipboard>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">0 followers</div>
                </div>
                <div className="de-flex-col">
                  <div className="profile_following">0 following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>On Sale</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Created </span>
                </li>
                <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}>Liked </span>
                </li>
                <li id="Mainbtn3" className="">
                  <span onClick={handleBtnClick3}>Owned </span>
                </li>
                <li id="Mainbtn4" className="">
                  <span onClick={handleBtnClick4}>Collections </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnZero />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnZero />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <ColumnZero />
          </div>
        )}
        {openMenu3 && (
          <div id="zero4" className="onStep fadeIn">
            <ColumnZero />
          </div>
        )}
        {openMenu4 && (
          <div id="zero5" className="onStep fadeIn">
            <GeneralCollectionsPage />
          </div>
        )}
      </section>
      )
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
    paramType: state.paramType,
    profileData: state.profileData,
  };
};

export default connect(mapStateToProps)(PersonalProfile);
