import React, { useState, useEffect } from "react";
import SliderMain from "../components/SliderMain";
// import FeatureBox from "../components/FeatureBox";
import CarouselCollection from "../components/CarouselCollection";
import CarouselNew from "../components/CarouselNew";
import AuthorList from "../components/AuthorList";
// import Category from "../components/Category";
import Footer from "../components/footer";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import Clock from "./../components/Clock";
import { getUpcomingMints } from "../../helpers/getterFunctions";
import moment from "moment";

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
// const fadeIn = keyframes`
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// `;

var bgImgStyle = {
  backgroundImage: "url(./img/background.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundColor: "#000",
};
var bgImgStylesec1 = {
  backgroundImage: "url(./img/background/banner-home.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundColor: "#000",
};

var mint_bg = {
  backgroundImage: "url(./img/mint/mint_bg.png)",
};

// var bgImgStyle2 = {
//   backgroundImage: "url(./img/bg-img-2.png)",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "40%",
//   backgroundPositionX: "0%",
//   backgroundPositionY: "30vh",
// };

const Home = () => {
  const [upcomingMints, setUpcomingMints] = useState([]);
  useEffect(async () => {
    try {
      const res = await getUpcomingMints({
        page: 1,
        limit: 12,
        isExclusive: 0,
      });
      console.log("result of getUpcomingMints helper fn--->", res);
      setUpcomingMints(res);
    } catch (e) {
      console.log("Error in fetching all upcoming mints list", e);
    }
  }, []);

  return (
    <div style={bgImgStyle}>
      <section
        style={bgImgStylesec1}
        className="jumbotron breadcumb no-bg h-vh pdd_8"
      >
        <SliderMain />
      </section>

      {/* <section className="container no-top no-bottom">
      <FeatureBox />
    </section> */}

      <section className="wallet_section pdd_8">
        <div className="container">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={0}
            duration={1000}
            triggerOnce
          >
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mb-lg-0 mb-xl-0 mb-4">
                <div className="wallet_box">
                  <div className="svg_icon">
                    <svg
                      width="44"
                      height="40"
                      viewBox="0 0 44 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M37.7888 9.49825H4.76313V8.22735L33.8257 5.99055V8.22735H37.7888V4.41463C37.7888 1.61863 35.4347 -0.343646 32.5602 0.0503348L6.03131 3.69529C3.15412 4.09182 0.800049 6.70226 0.800049 9.49825V34.9164C0.800049 36.2646 1.35677 37.5577 2.34773 38.511C3.33869 39.4644 4.68272 40 6.08415 40H37.7888C39.1902 40 40.5343 39.4644 41.5252 38.511C42.5162 37.5577 43.0729 36.2646 43.0729 34.9164V14.5819C43.0729 13.2336 42.5162 11.9406 41.5252 10.9872C40.5343 10.0338 39.1902 9.49825 37.7888 9.49825ZM33.8257 27.3062C33.3051 27.306 32.7896 27.2072 32.3087 27.0154C31.8278 26.8236 31.3908 26.5425 31.0228 26.1882C30.6548 25.8339 30.363 25.4134 30.1639 24.9506C29.9648 24.4878 29.8625 23.9918 29.8626 23.4909C29.8628 22.9901 29.9655 22.4941 30.1649 22.0315C30.3643 21.5688 30.6565 21.1484 31.0247 20.7944C31.393 20.4404 31.8301 20.1596 32.3111 19.968C32.7922 19.7765 33.3077 19.678 33.8284 19.6782C34.8798 19.6785 35.888 20.0807 36.6312 20.7962C37.3744 21.5117 37.7918 22.4819 37.7914 23.4935C37.7911 24.505 37.3731 25.475 36.6293 26.19C35.8856 26.905 34.8771 27.3065 33.8257 27.3062Z"
                        fill="#EF981D"
                      />
                    </svg>
                  </div>
                  <h4>Connect your Wallet</h4>
                  <p className="textdes">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-lg-0 mb-xl-0 mb-4">
                <div className="wallet_box">
                  <div className="svg_icon">
                    <svg
                      width="45"
                      height="40"
                      viewBox="0 0 45 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M39.431 25H16.5291L17.0404 27.5H38.0105C39.2137 27.5 40.1055 28.6173 39.8389 29.7905L39.4079 31.6871C40.8681 32.3959 41.875 33.8928 41.875 35.625C41.875 38.0627 39.8813 40.0347 37.4356 39.9995C35.1057 39.966 33.1895 38.0752 33.1266 35.7459C33.0923 34.4734 33.602 33.3202 34.4394 32.4999H18.0606C18.8713 33.2941 19.375 34.4005 19.375 35.625C19.375 38.1104 17.3025 40.1118 14.7914 39.9952C12.5617 39.8916 10.7484 38.0901 10.6312 35.861C10.5407 34.1396 11.4465 32.6223 12.8227 31.8309L7.33461 5H1.875C0.839453 5 0 4.16055 0 3.125V1.875C0 0.839453 0.839453 0 1.875 0H9.88508C10.7758 0 11.5435 0.626641 11.722 1.49922L12.4381 5H43.1242C44.3274 5 45.2192 6.11727 44.9526 7.29055L41.2594 23.5405C41.0654 24.3942 40.3065 25 39.431 25ZM31.4866 15H28.125V10.3125C28.125 9.79477 27.7052 9.375 27.1875 9.375H25.3125C24.7948 9.375 24.375 9.79477 24.375 10.3125V15H21.0134C20.1781 15 19.7598 16.0098 20.3505 16.6004L25.5871 21.837C25.9532 22.2031 26.5468 22.2031 26.913 21.837L32.1496 16.6004C32.7402 16.0098 32.3219 15 31.4866 15Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <h4>Buy NFTs</h4>
                  <p className="textdes">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-lg-0 mb-xl-0 mb-4">
                <div className="wallet_box">
                  <div className="svg_icon">
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.5988 4.84875C22.8957 4.14544 21.942 3.75021 20.9475 3.75H7.5C6.50544 3.75 5.55161 4.14509 4.84835 4.84835C4.14509 5.55161 3.75 6.50544 3.75 7.5V20.9475C3.75021 21.942 4.14544 22.8957 4.84875 23.5988L19.8488 38.5988C20.552 39.3018 21.5056 39.6967 22.5 39.6967C23.4944 39.6967 24.448 39.3018 25.1512 38.5988L38.5988 25.1512C39.3018 24.448 39.6967 23.4944 39.6967 22.5C39.6967 21.5056 39.3018 20.552 38.5988 19.8488L23.5988 4.84875ZM13.125 16.875C12.1302 16.8748 11.1762 16.4793 10.473 15.7757C9.7697 15.0721 9.37475 14.1179 9.375 13.1231C9.37525 12.1283 9.77067 11.1743 10.4743 10.4711C11.1779 9.76783 12.1321 9.37288 13.1269 9.37313C14.1217 9.37337 15.0757 9.7688 15.7789 10.4724C16.4822 11.176 16.8771 12.1302 16.8769 13.125C16.8766 14.1198 16.4812 15.0738 15.7776 15.777C15.074 16.4803 14.1198 16.8752 13.125 16.875Z"
                        fill="#EF981D"
                      />
                    </svg>
                  </div>
                  <h4>Sell NFTs</h4>
                  <p className="textdes">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mint_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center second_hd color-light mb-5">
                Exclusive Sales
                <div className="border_div">
                  <span className="title_bottom_border"></span>
                </div>
              </h2>
            </div>
            {upcomingMints
              ? upcomingMints.map((card, key) => {
                  console.log(
                    "date---->",
                    moment(card.saleStartTime).format("MMM"),
                    moment(card.saleStartTime).format("DD")
                  );
                  return (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-lg-0 mb-xl-0 mb-4">
                      <Link to={"/multimintingpage"}>
                        <div className="mint_box" style={mint_bg}>
                          <div className="mint_img">
                            <img alt="" src={card.coverImg} class="img-fluid" />
                            <div className="mint_date">
                              <span>
                                {moment(card.saleStartTime).format("DD")}
                              </span>{" "}
                              {moment(card.saleStartTime).format("MMM")}
                            </div>
                          </div>
                          <div className="mint_text p-4">
                            <img
                              alt=""
                              src={"../img/mint/m1.png"}
                              className="mc_img"
                            />
                            <h4>{card.name}</h4>
                            <ul className="m-0 p-0">
                              <li>
                                <img alt="" src={"../img/mint/hntr.svg"} />{" "}
                                {`${card.price} HNTR`}{" "}
                              </li>
                              <li>
                                <img alt="" src={"../img/mint/items.svg"} />{" "}
                                {`${card.items} items`}
                              </li>
                            </ul>
                            <span className="mint_time mt-4">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.0399 23.6399C17.6069 23.6399 22.1199 19.1091 22.1199 13.52C22.1199 7.93086 17.6069 3.39999 12.0399 3.39999C6.47292 3.39999 1.95996 7.93086 1.95996 13.52C1.95996 19.1091 6.47292 23.6399 12.0399 23.6399Z"
                                  fill="#428BC1"
                                />
                                <path
                                  d="M12.0399 21.4C16.3698 21.4 19.8799 17.872 19.8799 13.52C19.8799 9.168 16.3698 5.64001 12.0399 5.64001C7.71003 5.64001 4.19995 9.168 4.19995 13.52C4.19995 17.872 7.71003 21.4 12.0399 21.4Z"
                                  fill="white"
                                />
                                <path
                                  d="M3.59997 18.52L2.71997 24H3.47997C3.95997 24 4.11997 23.44 4.43997 22.76C4.83996 21.88 5.79996 19.6 5.79996 19.6L3.59997 18.52ZM20.4399 18.52L21.3599 24H20.5999C20.1199 24 19.9599 23.44 19.6399 22.76C19.2399 21.88 18.2799 19.6 18.2799 19.6L20.4399 18.52ZM4.51996 3.28006L6.87996 5.64005L5.63996 6.92005L3.27997 4.52006L4.51996 3.28006ZM19.5599 3.28006L17.1999 5.64005L18.4399 6.92005L20.7999 4.52006L19.5599 3.28006Z"
                                  fill="#428BC1"
                                />
                                <path
                                  d="M1.48 8.63997L8.51997 1.48C7.63997 0.559998 6.39998 0 4.99998 0C2.23999 0 0 2.27999 0 5.03998C0 6.43998 0.559998 7.71997 1.48 8.63997ZM15.4 1.52L22.5199 8.59997C23.4399 7.67998 23.9999 6.43998 23.9999 5.03998C23.9999 2.27999 21.7599 0 18.9599 0C17.5599 0.0399999 16.3199 0.599998 15.4 1.52Z"
                                  fill="#B0B8B8"
                                />
                                <path
                                  d="M7.43994 17.84L11.5599 13.64L12.0399 14.12L7.91994 18.28L7.43994 17.84Z"
                                  fill="#ED4C5C"
                                />
                                <path
                                  d="M12.0401 15.0002C12.8574 15.0002 13.52 14.3375 13.52 13.5202C13.52 12.7028 12.8574 12.0402 12.0401 12.0402C11.2227 12.0402 10.5601 12.7028 10.5601 13.5202C10.5601 14.3375 11.2227 15.0002 12.0401 15.0002Z"
                                  fill="#428BC1"
                                />
                                <path
                                  d="M11.28 7.88022H12.76V13.8802H11.28V7.88022ZM12.76 12.7602H15.76V14.2402H12.76V12.7602Z"
                                  fill="#428BC1"
                                />
                              </svg>
                              <Clock deadline={card.saleStartTime}></Clock>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              : ""}

            <div class="col-md-12 text-center mt-5">
              <Link to={"/mintcollectionlive"} className="view_all_bdr">
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container no-bottom pdd_8">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 className="text-center second_hd color-light mb-5">
                Hot Collections
                <div class="border_div">
                  <span class="title_bottom_border"></span>
                </div>
              </h2>
            </div>
          </div>
          <div className="col-lg-12">
            <CarouselCollection />
          </div>
        </div>
      </section>

      <section className="pdd_8 about_learnmore">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-12">
              <div className="row">
                <div className="col-lg-4 mb-4 mb-lg-0 mb-xl-0">
                  <div className="about_col">
                    <h3>The future of DigitalArms</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
                      lectus sit tellus massa praesent porttitor mattis.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0 mb-xl-0">
                  <div className="about_col">
                    <h3>Pioneering digital firearms marketplace</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
                      lectus sit tellus massa praesent porttitor mattis.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 mb-4 mb-lg-0 mb-xl-0">
                  <div className="about_col">
                    <h3>Designed for longevity</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
                      lectus sit tellus massa praesent porttitor mattis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 d-flex align-items-end mt-4 mt-lg-0 mt-xl-0">
              <Link to="" className="border_btn title_color">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container pdd_8 Most-recent">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 className="text-center second_hd color-light mb-5">
                Most recent items put on sale per
                <br /> Collection
                <div class="border_div">
                  <span class="title_bottom_border"></span>
                </div>
              </h2>
            </div>
          </div>
          <div className="col-lg-12">
            <CarouselNew />
          </div>
          <div class="col-md-12 text-center mt-5">
            <Link to={"/marketplace"} className="view_all_bdr">
              View All
            </Link>
          </div>
        </div>
      </section>

      <section className="pdd_8 pt-0">
        <div className="container no-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2 className="text-center second_hd color-light mb-5">
                  Top Sellers
                  <div class="border_div">
                    <span class="title_bottom_border"></span>
                  </div>
                </h2>
              </div>
            </div>
          </div>
          <AuthorList />
        </div>
      </section>

      {/* <section className="category_sec pdd_8">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 className="text-center second_hd color-light mb-5">Browse by Category
              <div class="border_div"><span class="title_bottom_border"></span></div>
              </h2>
            </div>
          </div>
        </div>
          <Category />
      </div>
    </section> */}

      <Footer />
    </div>
  );
};
export default Home;
