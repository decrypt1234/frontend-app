import React,{ useState, useEffect } from 'react';
// import { Card } from 'react-bootstrap';
import Footer from "../components/footer";
import Marketplacecart from "../components/Marketplacecart";
import Threegrid from '../SVG/Threegrid';
import Twogrid from '../SVG/Twogrid';
import { Marketplacecartj } from '../../Data/dummyJSON';

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


useEffect(() => {
  window.scrollTo(0, 0)
}, []);
  const gridtwo =()=>{
    setgrid("col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4");
    document.getElementById("gridtwo").classList.add("active");
    document.getElementById("gridthree").classList.remove("active");
  }
  const gridthree =()=>{
    setgrid("col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4");
    document.getElementById("gridthree").classList.add("active");
    document.getElementById("gridtwo").classList.remove("active");
  }

  const [grid, setgrid] = useState("col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4");

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
                  <div id="gridtwo" className="market_grid" onClick={gridtwo}>
                    <Twogrid />
                  </div>
                  <div id="gridthree" className="market_grid" onClick={gridthree}>
                    <Threegrid />
                  </div>
                {/* </div> */}
                <button type="button" className="filter_btn">Adv.Filter</button>
              </div>
            </div>
          </div>
          <div className='row'>
            {Marketplacecartj.map(card =>(
              <div className={grid} key={card.id}>
                <Marketplacecart image={card.img} profileimage={card.profile_img} checkImage={card.icheck_img} btnslug={card.btnslug} time={card.time} subtitle={card.subtitle} title={card.title}  />
              </div>
            ))}
          </div>
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
