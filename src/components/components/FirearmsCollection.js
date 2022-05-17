import React from 'react';
import Slider from "./slick-loader/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function FirearmsCollection() {

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
    <div className="nftdetails">
      <Slider {...settings}>
        <div className='nft_slide'>
          <img alt='' src={'../img/nftdetails/DA-Meta1.png'} class="img-fluid mb-3 nftslide_img" />

            <div className='nft_info'>
              
                <span>Meta Marine Collection <img alt='' src={'../img/check.png'} class="img-fluid" /></span>
                <h3 className=''>Meta Marine #625</h3>
                <p><img alt='' src={'../img/favicon.png'} class="img-fluid" /> 22500 $HNTR</p>
              
            </div>

        </div>
        <div className='nft_slide'>
          <img alt='' src={'../img/nftdetails/DA-Meta2.png'} class="img-fluid mb-3 nftslide_img" />

            <div className='nft_info'>
              
                <span>Meta Marine Collection <img alt='' src={'../img/check.png'} class="img-fluid" /></span>
                <h3 className=''>Meta Marine #625</h3>
                <p><img alt='' src={'../img/favicon.png'} class="img-fluid" /> 22500 $HNTR</p>
              
            </div>
        </div>
        <div className='nft_slide'>
          <img alt='' src={'../img/nftdetails/DA-Meta3.png'} class="img-fluid mb-3 nftslide_img" />

            <div className='nft_info'>
              
                <span>Meta Marine Collection <img alt='' src={'../img/check.png'} class="img-fluid" /></span>
                <h3 className=''>Meta Marine #625</h3>
                <p><img alt='' src={'../img/favicon.png'} class="img-fluid" /> 22500 $HNTR</p>
              
            </div>
        </div>
        <div className='nft_slide'>
          <img alt='' src={'../img/nftdetails/DA-Meta4.png'} class="img-fluid mb-3 nftslide_img" />
            <div className='nft_info'>
              
                <span>Meta Marine Collection <img alt='' src={'../img/check.png'} class="img-fluid" /></span>
                <h3 className=''>Meta Marine #625</h3>
                <p><img alt='' src={'../img/favicon.png'} class="img-fluid" /> 22500 $HNTR</p>
              
            </div>
        </div>
        <div className='nft_slide'>
          <img alt='' src={'../img/nftdetails/DA-Meta1.png'} class="img-fluid mb-3 nftslide_img" />
          
            <div className='nft_info'>
              
                <span>Meta Marine Collection <img alt='' src={'../img/check.png'} class="img-fluid" /></span>
                <h3 className=''>Meta Marine #625</h3>
                <p><img alt='' src={'../img/favicon.png'} class="img-fluid" /> 22500 $HNTR</p>
              
            </div>
        </div>
        <div className='nft_slide'>
          <img alt='' src={'../img/nftdetails/DA-Meta2.png'} class="img-fluid mb-3 nftslide_img" />
          
            <div className='nft_info'>
              
                <span>Meta Marine Collection <img alt='' src={'../img/check.png'} class="img-fluid" /></span>
                <h3 className=''>Meta Marine #625</h3>
                <p><img alt='' src={'../img/favicon.png'} class="img-fluid" /> 22500 $HNTR</p>
              
            </div>
        </div>
      </Slider>
    </div>
  )
}

export default FirearmsCollection
