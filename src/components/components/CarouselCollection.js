import React from 'react';
import Slider from "./slick-loader/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function CarouselCollection() {

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
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
    <div className="nft">
      <Slider {...settings}>
        <div className='collection_slide'>
          <img src={'../img/collections/coll1.png'} class="img-fluid" alt='' />
          <div className='collection_text'>
            <div className='coll_profileimg'>
              <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
              <img alt='' className='check_img' src={'../img/collections/check.png'} />
            </div>
            <h3 className='collname'>Name Last Name</h3>
            <p>ERC-73</p>
          </div>
        </div>
        <div className='collection_slide'>
          <img alt='' src={'../img/collections/coll1.png'} class="img-fluid" />
          <div className='collection_text'>
            <div className='coll_profileimg'>
              <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
              <img alt='' className='check_img' src={'../img/collections/check.png'} />
            </div>
            <h3 className='collname'>Name Last Name</h3>
            <p>ERC-73</p>
          </div>
        </div>
        <div className='collection_slide'>
          <img alt='' src={'../img/collections/coll1.png'} class="img-fluid" />
          <div className='collection_text'>
            <div className='coll_profileimg'>
              <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
              <img alt='' className='check_img' src={'../img/collections/check.png'} />
            </div>
            <h3 className='collname'>Name Last Name</h3>
            <p>ERC-73</p>
          </div>
        </div>
        <div className='collection_slide'>
          <img alt='' src={'../img/collections/coll1.png'} class="img-fluid" />
          <div className='collection_text'>
            <div className='coll_profileimg'>
              <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
              <img alt='' className='check_img' src={'../img/collections/check.png'} />
            </div>
            <h3 className='collname'>Name Last Name</h3>
            <p>ERC-73</p>
          </div>
        </div>
        <div className='collection_slide'>
          <img alt='' src={'../img/collections/coll1.png'} class="img-fluid" />
          <div className='collection_text'>
            <div className='coll_profileimg'>
              <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
              <img alt='' className='check_img' src={'../img/collections/check.png'} />
            </div>
            <h3 className='collname'>Name Last Name</h3>
            <p>ERC-73</p>
          </div>
        </div>
        <div className='collection_slide'>
          <img alt='' src={'../img/collections/coll1.png'} class="img-fluid" />
          <div className='collection_text'>
            <div className='coll_profileimg'>
              <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
              <img alt='' className='check_img' src={'../img/collections/check.png'} />
            </div>
            <h3 className='collname'>Name Last Name</h3>
            <p>ERC-73</p>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default CarouselCollection
