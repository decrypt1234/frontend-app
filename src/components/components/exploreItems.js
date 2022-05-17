import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { GetOnSaleItems, GetSearchedNft } from "../../apiServices";
// import { convertToEth } from "../../helpers/numberFormatter";
import { LikeNft } from "../../apiServices";
// import { checkIfLiked } from "../../helpers/getterFunctions";
import { connect } from "react-redux";

const ipfsAPI = require("ipfs-api");
// const BufferList = require("bl/BufferList");
const ipfs = ipfsAPI("ipfs.infura.io", "5001", {
  protocol: "https",
  auth: "21w11zfV67PHKlkAEYAZWoj2tsg:f2b73c626c9f1df9f698828420fa8439",
});

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

var NftPreview = {
  background: "red",
  // backgroundImage: "",
};

const ExploreItems = (props) => {
  const [height, setHeight] = useState(0);
  const [items, setItems] = useState([]);
  const [likeEvent, setLikeEvent] = useState(false);
  // loadMore = () => {
  //   let nftState = this.state.nfts;
  //   let start = nftState.length;
  //   let end = nftState.length + 4;
  //   this.setState({
  //     nfts: [...nftState, ...this.dummyData.slice(start, end)],
  //   });
  // };

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    async function fetch() {
      console.log("propss", props);
      let data;
      let itemsOnSale = [];

      if (!props.searchedData) {
        if (props.exploreSaleType?.exploreSaleType === -1) {
          data = {
            page: 1,
            limit: 15,
            conditions: {
              oStatus: 1,
            },
          };
        } else {
          data = {
            page: 1,
            limit: 15,
            conditions: {
              oStatus: 1,
              oType: props.exploreSaleType?.exploreSaleType,
            },
          };
        }
        itemsOnSale = await GetOnSaleItems(data);

        if (props.nftType !== -1)
          itemsOnSale.results[0] = itemsOnSale.results[0].filter((item) => {
            return item.nType === props.nftType;
          });
      } else {
        let reqParams = {
          length: 48,
          start: 0,
          sTextsearch: props.searchedData,
          sSellingType: "",
          sSortingType: "",
          page: 1,
          limit: 10,
        };
        itemsOnSale = await GetSearchedNft(reqParams);
      }
      console.log("itemsOnSale", itemsOnSale);
      let localRes = [];
      for (let i = 0; i < itemsOnSale?.results[0]?.length; i++) {
        console.log("resssss111", itemsOnSale.results[0][i].nHash);
        let res = await ipfs.cat(itemsOnSale.results[0][i].nHash);
        localRes[i] = res;
        console.log("resssss", res);
        console.log("File content >> ", JSON.parse(res.toString("utf8")));
        console.log("res----->>", res);
      }

      for (let i = 0; i < itemsOnSale?.results[0]?.length; i++) {
        itemsOnSale.results[0][i].imageHash = JSON.parse(
          localRes[i].toString("utf8")
        ).image;
      }

      setItems(
        itemsOnSale && itemsOnSale.results ? itemsOnSale.results[0] : []
      );
    }

    fetch();
  }, [props]);

  return (
    <div className="row">
      {items
        ? items.map((nft, index) => {
            return (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
              >
                <div className="nft__item m-0">
                  {nft.deadline && (
                    <div className="de_countdown">
                      <Clock deadline={nft.nOrders.oValidUpto} />
                    </div>
                  )}
                  <div className="author_list_pp_explore_page">
                    <span
                      onClick={
                        (() =>
                          (window.location.href = `./author/${nft.nCreater._id}`),
                        "_self")
                      }
                    >
                      <img
                        style={NftPreview}
                        className="lazy "
                        src={
                          nft.nCreater?.sProfilePicUrl
                            ? "https://decryptnft.mypinata.cloud/ipfs/" +
                              nft.nCreater.sProfilePicUrl
                            : "./img/author/author-1.jpg"
                        }
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      (window.location.href = `./itemDetail/${nft._id}`)
                    }
                    className="nft__item_wrap"
                    style={{ height: `${height}px` }}
                  >
                    <Outer>
                      <span>
                        <img
                          onLoad={onImgLoad}
                          src={nft.imageHash}
                          className="lazy nft__item_preview slider-img-preview"
                          alt=""
                        />
                      </span>
                    </Outer>
                  </div>
                  <div className="nft__item_info">
                    <span
                      onClick={
                        (() =>
                          (window.location.href = `./itemDetail/${nft._id}`),
                        "_self")
                      }
                    >
                      <h4>{nft.nTitle}</h4>
                    </span>
                    <div className="nft__item_price">
                      {/* {convertToEth(nft?.nOrders[0]?.oPrice.$numberDecimal)} ETH */}
                    </div>
                    <div className="nft__item_action">
                      <span
                        onClick={() =>
                          (window.location.href = `/itemDetail/${nft._id}`)
                        }
                      >
                        Buy
                      </span>
                    </div>
                    <div className="nft__item_like">
                    {nft.is_user_like ? (
                            <i
                              className="fa fa-heart"
                              style={{ color: "red" }}
                              onClick={async () => {
                                await LikeNft({ id: nft._id });
                                setLikeEvent(!likeEvent);
                                
                                // window.location.reload();
                              }}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-heart"
                              onClick={async () => {
                                await LikeNft({ id: nft._id });
                                setLikeEvent(!likeEvent);
                                // window.location.reload();
                              }}
                            ></i>
                          )}
                       <span>{nft?.nUser_likes?.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
      {/* {this.state.nfts.length !== this.dummyData.length && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span
            onClick={() => loadMore()}
            className="btn-main lead m-auto"
          >
            Load More
          </span>
        </div>
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
    exploreSaleType: state.exploreSaleType,
  };
};

export default connect(mapStateToProps)(ExploreItems);
