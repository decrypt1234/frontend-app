import React from 'react';
import Footer from '../components/footer';
import Relatedcollection from '../components/Relatedcollection';
import AuthorListing from '../components/AuthorListing';
import Header from '../menu/header';

const bgImgStyle = {
  backgroundImage: "url(./img/background.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundColor: "#000",
};

const bgImage = {
  backgroundImage: "url(./img/author/authorbg.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center", 
}
var bgImgarrow = {
  backgroundImage: "url(./img/ep_arrow-right-bold.png)",
  backgroundRepeat: "no-repeat",
};

function Author() {
  return (
    <div style={bgImgStyle}>
      <Header />
      <section className="collection_banner pdd_8 d-flex align-items-center justify-content-center" style={bgImage}>
        <div className="container d-flex align-items-center justify-content-center">
          <button type="" className="edit_btn"><i class='fa fa-edit fa-lg'></i></button>
        </div>
      </section>
      <section className="collection_info" >
        <div className="container">
          <div className="row align-items-end martop-100">
            <div className="col-md-4">

            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <div className="auther_pick">
                <img alt='' src={'../img/author/user-img.png'} class="img-fluid collection_profile" />
                <div className="overlat_btn"><button type="" className="img_edit_btn"><i class='fa fa-edit fa-lg'></i></button></div>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-end">
              <div className="follow_btns">
                <button type="button" className="white_btn mr10">5.2k Followers</button>
                <button type="button" className="yellow_btn">Follow</button>
              </div>
            </div>
          </div>
          {/* <div className="collection_pick">
            <img alt='' src={'../img/author/user-img.png'} class="img-fluid collection_profile" />
            <div className="overlat_btn"><button type="" className="img_edit_btn"><i class='fa fa-edit fa-lg'></i></button></div>
          </div> */}
          
          <h1 className="collection_title text-center">User Name <img alt='' src={'../img/author/check.png'} class="img-fluid" /></h1>
          <ul class="collection_social mb-4">
            <li><a href="/"><i class="fa fa-facebook fa-lg"></i></a></li>
            <li><a href="/"><i class="fa fa-twitter fa-lg"></i></a></li>
            <li><a href="/"><i class="fa fa-linkedin fa-lg"></i></a></li>
            <li><a href="/"><i class="fa fa-pinterest fa-lg"></i></a></li>
            <li><a href="/"><i class="fa fa-rss fa-lg"></i></a></li>
          </ul>
          <div className="coppycode text-center mb-4">
            <span className='d-inline-flex align-items-center'>
            <svg className="copysvg" width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.14228 0L6.27637 0.455737V13.6802L6.14228 13.814L0.00364971 10.1855L6.14228 0Z" fill="#8C8C8C"/>
              <path d="M6.14213 0L12.2808 10.1855L6.14213 13.8141V7.39532V0Z" fill="#8C8C8C"/>
              <path d="M6.14222 14.9763L6.21777 15.0684V19.7793L6.14222 20L-6.29425e-05 11.3496L6.14222 14.9763Z" fill="#8C8C8C"/>
              <path d="M6.14213 19.9997V14.9761L12.2808 11.3494L6.14213 19.9997Z" fill="#8C8C8C"/>
              <path d="M6.14209 13.8139L0.00355101 10.1854L6.14209 7.39526V13.8139Z" fill="#8C8C8C"/>
              <path d="M12.2808 10.1854L6.14222 13.8139V7.39526L12.2808 10.1854Z" fill="#8C8C8C"/>
            </svg>
              0xff55...0149</span>
          </div>
          <div className="user_description text-center mb-5">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis egestas a, praesent elit faucibus magnis dignissim. Lorem aliquet faucibus metus nibh amet cursus. Lorem suspendisse malesuada tortor, faucibus.</p>
            <h6>Joined March 2022</h6>
          </div>

        <div className="row">
            <div className="col-md-12">
                <h4 className="second_hd text-center mb-3">Collection</h4>
            </div>
        </div>
            <Relatedcollection />
        
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <button type="button" className='item_btn mr-3'><img alt='' src={'../img/items.svg'} class="img-fluid" /> Items</button>
              <button type="button" className="activity_btn"><img alt='' src={'../img/activity.svg'} class="img-fluid" /> Activity</button>
            </div>
          </div>
          
          <ul className="auther_cart">
            <li className="active"><img alt='' src={'../img/author/icon1.svg'} class="img-fluid" /> Collected 45</li>
            <li><img alt='' src={'../img/author/icon2.svg'} class="img-fluid" /> Created</li>
            <li><img alt='' src={'../img/author/icon3.svg'} class="img-fluid" /> Favourited</li>
            <li><img alt='' src={'../img/author/icon4.svg'} class="img-fluid" /> Activity</li>
            <li><img alt='' src={'../img/author/icon5.svg'} class="img-fluid" /> Offers</li>
          </ul>

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
        </div>
      </section>
      <section className="collection_list mb-5 pb-5">
        <div className="container">
          <AuthorListing />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Author
