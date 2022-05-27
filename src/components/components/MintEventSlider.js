import React, { useEffect, useState } from "react";
import Slider from "./slick-loader/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Wallet from "../SVG/wallet";
import { getNFTList } from "../../apiServices";

function MintEventSlider(props) {
  var settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    dots: false,
    speed: 300,
    centerPadding: "0px",
    infinite: false,
    autoplaySpeed: 5000,
    autoplay: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const [nfts, setNfts] = useState([]);
  const [currQty, setCurrQty] = useState(0);
  let mint = [];

  useEffect(() => {
    console.log("props.id", props.id);
    const fetch = async () => {
      let reqBody = { page: 1, limit: 12, collectionID: props.id };
      let nfts = await getNFTList(reqBody);
      if (nfts && nfts.results && nfts.results.length > 0) {
        for (let i = 0; i < nfts.results.length; i++) {
          mint[i] = 0;
        }
        setNfts(nfts.results[0]);
      }
    };
    fetch();
  }, [props.id]);

  return (
    <Slider {...settings}>
      {console.log("nfts", nfts)}
      {nfts && nfts.length > 0
        ? nfts.map((n, i) => {
            return (
              <div className="mintevent text-center">
                <div className="start_btn">
                  Start
                  <span>Live</span>
                </div>
                <h4>Mint Event</h4>
                <p>
                  {props.leftQty} / {n.totalQuantity} Minted
                </p>
                <div className="da_img mb-3">
                  <img src={n.image} alt="" />
                </div>
                <Link to={"#"} className="connect_wallet_btn mb-4">
                  {" "}
                  <Wallet /> Connect Wallet
                </Link>
                <div className="mintprice">Mint Price {props.price} HNTR</div>
                <div className="amount">
                  <h5>Select Amount</h5>
                  <p>Minimum for mint is 1*</p>
                  <div className="qt_selector">
                    <button
                      onClick={() => {
                       
                        let mint = currQty - 1;
                        setCurrQty(Number(mint));
                      }}
                    >
                      -
                    </button>

                    <input
                      type="text"
                      name=""
                      required=""
                      id=""
                      onChange={(e) => {
                        setCurrQty(Number(e.target.value));
                      }}
                      value={currQty}
                    />

                    <button
                      onClick={() => {
                      
                        let mint = currQty + 1;
                        setCurrQty(Number(mint));
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="mint_btn mt-4">
                    <button className="" type="button">
                      Mint
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </Slider>
  );
}

export default MintEventSlider;
