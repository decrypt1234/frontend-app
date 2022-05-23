import React from 'react';
import Footer from "../components/footer";
import { Link } from 'react-router-dom';

var register_bg = {
    backgroundImage: "url(../img/Marketplace/marketplace-bg.jpg)",
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
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                    <ul className="tab_btn mb-5 nav nav-pills1" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Trending</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">Top</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-Firearms-tab" data-bs-toggle="pill" data-bs-target="#pills-Firearms" type="button" role="tab" aria-controls="pills-Firearms" aria-selected="true">Firearms</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-Soldiers-tab" data-bs-toggle="pill" data-bs-target="#pills-Soldiers" type="button" role="tab" aria-controls="pills-Soldiers" aria-selected="true">Soldiers</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-Hot-tab" data-bs-toggle="pill" data-bs-target="#pills-Hot" type="button" role="tab" aria-controls="pills-Hot" aria-selected="true">Hot List</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-Ranking-tab" data-bs-toggle="pill" data-bs-target="#pills-Ranking" type="button" role="tab" aria-controls="pills-Ranking" aria-selected="true">NFT Ranking</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-Auctions-tab" data-bs-toggle="pill" data-bs-target="#pills-Auctions" type="button" role="tab" aria-controls="pills-Auctions" aria-selected="true">Live Auctions</button>
                        </li>
                    </ul>
                  </div>
              </div>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div className="row">
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/marketplace1.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Primary Arms PLx 1-8x24 Riflescope</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/HeadDownAR-5.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>HD15 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/DGA03-X3.35.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Barrett M82A1 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/DGA27-MarketingAssets-CMMGMk47-SoloImages.249.7.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>CMMG Mk47 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/SoloImages.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Digital Arms GOLD skin</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/ZeroTechScope.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>ZeroTech Reflex Scope Forged with CMMG Mk47</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/markit2.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>AMMO refill</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/Marines.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Meta Marine Soldier NFT</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/solider-nft.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Meta Marine Soldier NFT</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div class="col-md-12 text-center mt-5"><a class="view_all_bdr" href="/">Load More</a></div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <div className="row">
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/marketplace1.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Primary Arms PLx 1-8x24 Riflescope</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/HeadDownAR-5.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>HD15 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/DGA03-X3.35.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Barrett M82A1 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/DGA27-MarketingAssets-CMMGMk47-SoloImages.249.7.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>CMMG Mk47 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/SoloImages.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Digital Arms GOLD skin</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/ZeroTechScope.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>ZeroTech Reflex Scope Forged with CMMG Mk47</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/markit2.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>AMMO refill</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/Marines.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Meta Marine Soldier NFT</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/solider-nft.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Meta Marine Soldier NFT</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div class="col-md-12 text-center mt-5"><a class="view_all_bdr" href="/">Load More</a></div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-Firearms" role="tabpanel" aria-labelledby="pills-Firearms-tab">
                    <div className="row">
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/marketplace1.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Primary Arms PLx 1-8x24 Riflescope</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/HeadDownAR-5.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>HD15 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/DGA03-X3.35.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Barrett M82A1 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/DGA27-MarketingAssets-CMMGMk47-SoloImages.249.7.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>CMMG Mk47 Rifle</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/SoloImages.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>Digital Arms GOLD skin</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/ZeroTechScope.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>ZeroTech Reflex Scope Forged with CMMG Mk47</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 mb-5">
                        <Link to={'/collectionwithcollection'} >
                            <div className='collection_slide'>
                                <img className="img-fluid" src={'../img/marketplace/markit2.png'} alt="" />
                                <div className='collection_text'>
                                    <div className='coll_profileimg'>
                                    <img alt='' className='profile_img' src={'../img/collections/profile1.png'} />
                                    <img alt='' className='check_img' src={'../img/collections/check.png'} />
                                    </div>
                                    <h4 className='collname'>AMMO refill</h4>
                                    <p>ERC-73</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        
                        <div class="col-md-12 text-center mt-5"><a class="view_all_bdr" href="/">Load More</a></div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-Soldiers" role="tabpanel" aria-labelledby="pills-Soldiers-tab"></div>
                <div class="tab-pane fade" id="pills-Hot" role="tabpanel" aria-labelledby="pills-Hot-tab"></div>
                <div class="tab-pane fade" id="pills-Ranking" role="tabpanel" aria-labelledby="pills-Ranking-tab"></div>
                <div class="tab-pane fade" id="pills-Auctions" role="tabpanel" aria-labelledby="pills-Auctions-tab"></div>
              </div>
          </div>
            
      </section>

      <Footer />
    </div>
  )
}

export default Marketplace
