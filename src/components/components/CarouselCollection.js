import React, { useState, useEffect } from "react";
import Slider from "./slick-loader/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getHotCollections } from "../../helpers/getterFunctions";

var settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  swipe: true,
  swipeToSlide: true,
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
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

function CarouselCollection() {
  const [hotCollections, setHotCollections] = useState([]);
  useEffect(async () => {
    try {
      const res = await getHotCollections({
        page: 1,
        limit: 12,
        isHotCollection: 1,
      });
      console.log("result of getHotCollections helper fn--->", res);
      setHotCollections(res);
    } catch (e) {
      console.log("Error in fetching all hot collections list", e);
    }
  }, []);

  return (
    <div className='nft'>
      <Slider {...settings}>
        {hotCollections
          ? hotCollections.map((card) => {
              return (
                <div className='collection_slide'>
                  <img src={card.logoImg} class='img-fluid' alt='' />
                  <div className='collection_text'>
                    <div className='coll_profileimg'>
                      <img alt='' className='profile_img' src={card.coverImg} />
                      <img
                        alt=''
                        className='check_img'
                        src={"../img/collections/check.png"}
                      />
                    </div>
                    <h3 className='collname'>{card.name}</h3>
                    <p>{card.desc}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </Slider>
    </div>
  );
}

export default CarouselCollection;
