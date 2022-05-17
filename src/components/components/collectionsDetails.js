import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { getUsersNFTs } from "../../helpers/getterFunctions";
import { connect } from "react-redux";
import { LikeNft } from "../../apiServices";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const OnSaleItems = (props) => {
  const [nfts, setNfts] = useState([]);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      console.log("paramsType", props.profileData);
      if (
        props.paramType &&
        props.profileData &&
        props.profileData.profileData
      ) {
        console.log(
          "props.profileData.profileData._id",
          props.profileData.profileData.sWalletAddress
        );
        // let data = await GetMyNftList({
        //   nOwnedBy: props.profileData.profileData.sWalletAddress,
        // });
        // let getFormattedData = await getUsersNFTs(data);
        // console.log("getFormattedData", getFormattedData);
        let data = await getUsersNFTs(
          props.paramType ? props.paramType.paramType : 0,
          props.profileData ? props.profileData.profileData.sWalletAddress : "",
          props.profileData ? props.profileData.profileData._id : ""
        );
        console.log("data", data);
        setLoading(false);
        setNfts(data);
      }
    };
    fetch();
  }, [props.paramType, props.profileData]);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  return (
    <div className="row">
      {nfts.map((nft, index) => (
        <div
          key={index}
          className="d-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12"
        >
          <div className="nft__item">
            {nft.deadline && (
              <div className="de_countdown">
                <Clock deadline={nft.deadline} />
              </div>
            )}
            <div className="author_list_pp">
              <span
                onClick={
                  (() => (window.location.href = nft.authorLink), "_self")
                }
              >
                <img className="lazy" src={nft.authorImg} alt="" />
                <i className="fa fa-check"></i>
              </span>
            </div>
            <div className="nft__item_wrap" style={{ height: `${height}px` }}>
              <Outer>
                <span>
                  <img
                    onLoad={onImgLoad}
                    src={nft.previewImg}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </Outer>
            </div>
            <div className="nft__item_info">
              <span
                onClick={() => (window.location.href = "/itemDetail/" + nft.id)}
              >
                <h4>{nft.title}</h4>
              </span>
              <div className="nft__item_price">
                {nft.price ? nft.price : ""}
                <span>{nft.bid}</span>
              </div>
              <div className="nft__item_action">
                {console.log("nft.id", nft)}
                <span
                  onClick={() =>
                    (window.location.href = "/itemDetail/" + nft.id)
                  }
                >
                  Buy Now
                </span>
              </div>
              <div className="nft__item_like">
                <i
                  className="fa fa-heart"
                  onClick={() => {
                    console.log("nft.id", nft.id);
                    LikeNft({ id: nft.id });
                  }}
                ></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
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

export default connect(mapStateToProps)(OnSaleItems);
