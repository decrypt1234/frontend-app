import React from 'react';
import Footer from "../components/footer";
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import Marketplacecart from "../components/Marketplacecart";
import Header from '../menu/header';
>>>>>>> 6319a3f52d72a444bdcf802ed3f8ff96a0c514eb

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
<<<<<<< HEAD
      <section className='register_hd pdd_12' style={register_bg}>
          <div className='container'>
              <div className='row'>
                  <div className='col-md-12'>
                      <h1>Marketplace</h1>
                  </div>
              </div>
          </div>
      </section>
      <section className="marketplace-tab pdd_8" style={bgImgStyle}>
      {/* <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">..dv.</div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...sv</div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...devf</div>
            </div> */}
=======
      <Header />
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
>>>>>>> 6319a3f52d72a444bdcf802ed3f8ff96a0c514eb
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
