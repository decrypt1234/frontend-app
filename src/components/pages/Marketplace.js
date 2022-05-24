import React from 'react';
import Footer from "../components/footer";
import Marketplacecart from "../components/Marketplacecart";

var register_bg = {
    backgroundImage: "url(./img/Marketplace/marketplace-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
};
var bgImgStyle = {
  backgroundImage: "url(./img/background.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundColor: "#000",
};
var bgImgarrow = {
  backgroundImage: "url(./img/ep_arrow-right-bold.png)",
  backgroundRepeat: "no-repeat",
};

function Marketplace() {
  return (
    <div>
        <section className='register_hd pdd_12' style={register_bg}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>Marketplace</h1>
                    </div>
                </div> 
            </div>
        </section>
        <section className="marketplacecollection pdd_8" style={bgImgStyle}>
          <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="market_search_form mb-5">
                <form class="d-flex marketplace_form">
                  <input class=" me-2" type="search" placeholder="Search item here..." aria-label="Search" />
                  <button class="market_btn" type="submit"><img src="../img/search.svg" alt="" /></button>
                </form>
                <select class="market_select_form form-select" aria-label="Default select example" style={bgImgarrow}>
                  <option selected>Single Items</option>
                  <option value="1">Single Items 1</option>
                  <option value="2">Single Items 2</option>
                  <option value="3">Single Items 3</option>
                </select>
                <select class="market_select_form form-select" aria-label="Default select example" style={bgImgarrow}>
                  <option selected>Price: Low to High</option>
                  <option value="1">$2000</option>
                  <option value="2">$4000</option>
                  <option value="3">$6000</option>
                </select>
                {/* <div className="market_div"> */}
                  <div className="market_grid">
                    <img alt='' src={'../img/twogrid.png'} class="img-fluid" />
                  </div>
                  <div className="market_grid">
                    <img alt='' src={'../img/threegrid.png'} class="img-fluid" />
                  </div>
                {/* </div> */}
                <button type="button" className="filter_btn">Adv.Filter</button>
              </div>
            </div>
          </div>
          <Marketplacecart />
          <div className="row">
            <div class="col-md-12 text-center mt-5"><a class="view_all_bdr" href="/">Load More</a></div>
          </div>
          </div>
        </section>
        <Footer />
    </div>
  )
}

export default Marketplace
