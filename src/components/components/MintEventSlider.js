import React from 'react';
import Slider from "./slick-loader/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Wallet from '../SVG/wallet';

function MintEventSlider() {

    var settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        arrows: true,
        dots: false,
        speed: 300,
        centerPadding: '0px',
        infinite: true,
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
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
            },
          },
        ], 
    };
    


  return (
        <Slider {...settings}>
            <div className="mintevent text-center">
                <div className="start_btn">Start
                    <span>Live</span>
                </div>
                <h4>Mint Event</h4>
                <p>150 / 500 Minted</p>
                <div className='da_img mb-3'><img src={'../img/mint/da.png'} alt="" /></div>
                <Link to={'#'} className="connect_wallet_btn mb-4"> <Wallet /> Connect Wallet</Link>
                <div className="mintprice">Mint Price 2000 HNTR</div>
                <div className="amount">
                    <h5>Select Amount</h5>
                    <p>Minimum for mint is 1*</p>
                    <div className="qt_selector">
                        <button>-</button>
                        <input type="text" name="" required="" id="" value="1" />
                        <button>+</button>
                    </div>
                    <div className="mint_btn mt-4"><button className="" type='button'>Mint</button></div>
                </div>  
            </div>
            <div className="mintevent text-center">
                <div className="start_btn">Start
                    <span>Live</span>
                </div>
                <h4>Mint Event</h4>
                <p>150 / 500 Minted</p>
                <div className='da_img mb-3'><img src={'../img/mint/da.png'} alt="" /></div>
                <Link to={'#'} className="connect_wallet_btn mb-4"> <Wallet /> Connect Wallet</Link>
                <div className="mintprice">Mint Price 2000 HNTR</div>
                <div className="amount">
                    <h5>Select Amount</h5>
                    <p>Minimum for mint is 1*</p>
                    <div className="qt_selector">
                        <button>-</button>
                        <input type="text" name="" required="" id="" value="1" />
                        <button>+</button>
                    </div>
                    <div className="mint_btn mt-4"><button className="" type='button'>Mint</button></div>
                </div>  
            </div>
            <div className="mintevent text-center">
                <div className="start_btn">Start
                    <span>Live</span>
                </div>
                <h4>Mint Event</h4>
                <p>150 / 500 Minted</p>
                <div className='da_img mb-3'><img src={'../img/mint/da.png'} alt="" /></div>
                <Link to={'#'} className="connect_wallet_btn mb-4"> <Wallet /> Connect Wallet</Link>
                <div className="mintprice">Mint Price 2000 HNTR</div>
                <div className="amount">
                    <h5>Select Amount</h5>
                    <p>Minimum for mint is 1*</p>
                    <div className="qt_selector">
                        <button>-</button>
                        <input type="text" name="" required="" id="" value="1" />
                        <button>+</button>
                    </div>
                    <div className="mint_btn mt-4"><button className="" type='button'>Mint</button></div>
                </div>  
            </div>
            <div className="mintevent text-center">
                <div className="start_btn">Start
                    <span>Live</span>
                </div>
                <h4>Mint Event</h4>
                <p>150 / 500 Minted</p>
                <div className='da_img mb-3'><img src={'../img/mint/da.png'} alt="" /></div>
                <Link to={'#'} className="connect_wallet_btn mb-4"> <Wallet /> Connect Wallet</Link>
                <div className="mintprice">Mint Price 2000 HNTR</div>
                <div className="amount">
                    <h5>Select Amount</h5>
                    <p>Minimum for mint is 1*</p>
                    <div className="qt_selector">
                        <button>-</button>
                        <input type="text" name="" required="" id="" value="1" />
                        <button>+</button>
                    </div>
                    <div className="mint_btn mt-4"><button className="" type='button'>Mint</button></div>
                </div>  
            </div>
            <div className="mintevent text-center">
                <div className="start_btn">Start
                    <span>Live</span>
                </div>
                <h4>Mint Event</h4>
                <p>150 / 500 Minted</p>
                <div className='da_img mb-3'><img src={'../img/mint/da.png'} alt="" /></div>
                <Link to={'#'} className="connect_wallet_btn mb-4"> <Wallet /> Connect Wallet</Link>
                <div className="mintprice">Mint Price 2000 HNTR</div>
                <div className="amount">
                    <h5>Select Amount</h5>
                    <p>Minimum for mint is 1*</p>
                    <div className="qt_selector">
                        <button>-</button>
                        <input type="text" name="" required="" id="" value="1" />
                        <button>+</button>
                    </div>
                    <div className="mint_btn mt-4"><button className="" type='button'>Mint</button></div>
                </div>  
            </div>
            <div className="mintevent text-center">
                <div className="start_btn">Start
                    <span>Live</span>
                </div>
                <h4>Mint Event</h4>
                <p>150 / 500 Minted</p>
                <div className='da_img mb-3'><img src={'../img/mint/da.png'} alt="" /></div>
                <Link to={'#'} className="connect_wallet_btn mb-4"> <Wallet /> Connect Wallet</Link>
                <div className="mintprice">Mint Price 2000 HNTR</div>
                <div className="amount">
                    <h5>Select Amount</h5>
                    <p>Minimum for mint is 1*</p>
                    <div className="qt_selector">
                        <button>-</button>
                        <input type="text" name="" required="" id="" value="1" />
                        <button>+</button>
                    </div>
                    <div className="mint_btn mt-4"><button className="" type='button'>Mint</button></div>
                </div>  
            </div>
        </Slider>
  )
}

export default MintEventSlider
