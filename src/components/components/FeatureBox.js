import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const FeatureBox = () => (
  <div className="row">
    <h1 className="Create-sell-h1">How it works.</h1>

    <div
      // onClick={() => (window.location.href = "/wallet")}
      className="col-lg-4 col-md-6 mb-3"
    >
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className="bg-color-2 i-boxed icon_wallet"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="box-heading">Set up your wallet</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="p-box">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem.
            </p>
          </Reveal>
        </div>
        <i className="wm icon_wallet"></i>
      </div>
    </div>

    <div
      // onClick={() => (window.location.href = "/createOptions")}
      className="col-lg-4 col-md-6 mb-3"
    >
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="box-heading">Create your NFT's</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="p-box">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem.
            </p>
          </Reveal>
        </div>
        <i className="wm icon_cloud-upload_alt"></i>
      </div>
    </div>

    <div
      // onClick={() => (window.location.href = "/Author")}
      className="col-lg-4 col-md-6 mb-3"
    >
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className=" bg-color-2 i-boxed icon_tags_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="box-heading">Sell your NFT's</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="p-box">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem.
            </p>
          </Reveal>
        </div>
        <i className="wm icon_tags_alt"></i>
      </div>
    </div>
  </div>
);
export default FeatureBox;
