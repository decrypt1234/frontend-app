import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Sidebar from "../components/Sidebar";
import { connect } from "react-redux";
import {
  createCollection,
  exportInstance,
  GetMyCollectionsList,
} from "../../apiServices";
import contracts from "../../config/contracts";
import degnrABI from "./../../config/abis/dgnr8.json";
import { ethers } from "ethers";
//import Loader from "../components/loader";
import { NotificationManager } from "react-notifications";
import { Item } from "semantic-ui-react";

function CreateCollection() {
  const [files, setFiles] = useState([]);
  const [logoImg, setLogoImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [title, setTitle] = useState("MJ");
  const [symbol, setSymbol] = useState("MJ");
  const [description, setDescription] = useState("mj collection");
  const [royalty, setRoyalty] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [maxSupply, setMaxSupply] = useState(1);
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [preSaleStartTime, setPreSaleStartTime] = useState("");
  const [datetime2, setDatetime2] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [myCollections, setMyCollections] = useState([]);
  const [ datetime3, setDatetime3 ] = useState('');
  const [PaymentToken, setPaymentToken] = useState("");
  

  const [status, setStatus] = React.useState(0) // 0: no show, 1: show yes, 2: show no.

    const radioHandler = (status) => {
        setStatus(status);
    };

  useEffect(() => {
    if (cookies.selected_account) setCurrentUser(cookies.selected_account);
    else NotificationManager.error("Connect Yout Metamask", "", 800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("current user is---->", currentUser, cookies.selected_account);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const fetch = async () => {
        let reqBody = {
          page: 1,
          limit: 12,
        };

        let data = await GetMyCollectionsList(reqBody);
        if (data && data.results.length > 0) setMyCollections(data?.results[0]);
      };
      fetch();
    }
  }, [currentUser]);

  function handleChange(ev) {
    if (!ev.target["validity"].valid) return;
    const dt = ev.target["value"] + ":00Z";
    setPreSaleStartTime(dt);
  }

  function handleChange2(evv) {
    if (!evv.target["validity"].valid) return;
    const dtt = evv.target["value"] + ":00Z";
    setDatetime2(dtt);
  }

    function handleChange3(evv) {
        if (!evv.target['validity'].valid) return;
        const dttt= evv.target['value'] + ':00Z';
        setDatetime3(dttt);
      }

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      if (e.target.files && e.target.files[0]) {
        setLogoImg(e.target.files[0]);
      }
    }
  };

  const uploadedImage2 = React.useRef(null);
  const imageUploader2 = React.useRef(null);

  const handleImageUpload2 = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage2;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      if (e.target.files && e.target.files[0]) {
        setCoverImg(e.target.files[0]);
      }
    }
  };

  const numberInputCheck = (e) => {
    const re = /[+-]?[0-9]+\.?[0-9]*/;
    let val = e.target.value;
    if (val === "" || re.test(val)) {
      const numStr = String(val);
      if (numStr.includes(".")) {
        if (numStr.split(".")[1].length > 8) {
        } else {
          if (val.split(".").length > 2) {
            val = val.replace(/\.+$/, "");
          }
          if (val.length === 2 && val !== "0.") {
            val = Number(val);
          }
          setPrice(val);
        }
      } else {
        if (val.split(".").length > 2) {
          val = val.replace(/\.+$/, "");
        }
        if (val.length === 2 && val !== "0.") {
          val = Number(val);
        }
        setPrice(val);
      }
    }
  };
  const MinimumbidCheck = (e) => {
    let mini = e.target.value;
  }

  const readReceipt = async (hash) => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider is--->", provider);
    const receipt = await provider.getTransactionReceipt(hash.hash);
    let contractAddress = receipt.logs[0].address;
    return contractAddress;
  };

  const handleValidationCheck = () => {
    if (logoImg === "" || logoImg === undefined) {
      NotificationManager.error("Please Upload a Logo Image", "", 800);
      return false;
    }
    if (coverImg === "" || coverImg === undefined) {
      NotificationManager.error("Please Upload a Cover Imag", "", 800);
      return false;
    }
    if (title.trim() === "" || title === undefined) {
      NotificationManager.error("Please Enter a Title", "", 800);
      return false;
    }
    if (royalty.trim() === "" || royalty === undefined) {
      NotificationManager.error("Please Enter the value for Royalty", "", 800);
      return false;
    }
    if (preSaleStartTime === "" || preSaleStartTime === undefined) {
      NotificationManager.error("Please Choose a Valid Start Date.");
      return false;
    }
    if (datetime2 === "" || datetime2 === undefined) {
      NotificationManager.error("Please Choose a Valid End Date", "", 800);
      return false;
    }
    if (maxSupply === "" || maxSupply === undefined) {
      NotificationManager.error("Please Enter Max Supply", "", 800);
      return false;
    }
    if (price.trim() === "" || price === undefined) {
      NotificationManager.error("Please Enter a Price", "", 800);
      return false;
    }
    if (category === "" || category === undefined) {
      NotificationManager.error("Please Choose a Category", "", 800);
      return false;
    }
    if (brand === "" || brand === undefined) {
      NotificationManager.error("Please Choose a Brand", "", 800);
      return false;
    }
    if (PaymentToken === "" || PaymentToken === undefined) {
      NotificationManager.error("Please Choose a Payment Token", "", 800);
      return false;
    }
    
    if (symbol.trim() === "" || symbol === undefined) {
      NotificationManager.error("Symbol can't be empty", "", 800);
      return false;
    }
    if (description.trim() === "" || description === undefined) {
      NotificationManager.error(
        "Please Enter a Description For Your Collection",
        "",
        800
      );
      return false;
    }
    return true;
  };

  //handle collection creator

  const handleCollectionCreation = async () => {
    if (cookies.selected_account) {
      let creator = await exportInstance(contracts.CREATOR_PROXY, degnrABI);
      console.log("creator is---->", creator);
      console.log("create collection is called");
      console.log("contracts usdt address", contracts.USDT);

      let res1;
      try {
        setLoading(true);
        maxSupply == 1
          ? (res1 = await creator.deployExtendedERC721(
              title,
              symbol,
              logoImg,
              royalty,
              contracts.USDT
            ))
          : (res1 = await creator.deployExtendedERC1155(
              logoImg,
              royalty,
              contracts.USDT
            ));
      } catch (e) {
        console.log(e);
      }
      let hash = res1;
      res1 = await res1.wait();
      console.log("res1 is--->", res1);
      if (res1.status === 1) {
        let type;
        if (maxSupply > 1) {
          type = 1;
        } else {
          type = 0;
        }
        let contractAddress = await readReceipt(hash);
        console.log("contract address is--->", contractAddress);
        var fd = new FormData();
        fd.append("name", title);
        fd.append("description", description);
        fd.append("logoImage", logoImg);
        fd.append("coverImage", coverImg);
        fd.append("categoryID", "62878304ee30230742fcab07");
        fd.append("brandID", "628788089b97d717f190d9aa");
        //fd.append("chainID", chain);
        fd.append("contractAddress", contractAddress);
        fd.append("preSaleStartTime", preSaleStartTime);
        fd.append("totalSupply", maxSupply);
        fd.append("type", type);

        console.log("form data is---->", fd.value);
        setLoading(true);
        try {
          let collection = await createCollection(fd);
          console.log("create Collection response is--->", collection);
          setLoading(false);
          NotificationManager.success(collection.message, "", 800);
          setTimeout(() => {
            window.location.href = "/createcollection";
          }, 1000);
        } catch (e) {
          NotificationManager.error(e.message, "", 800);
          setTimeout(() => {
            window.location.href = "/createcollection";
          }, 1000);
        }
      } else {
        NotificationManager.error("Connect Yout Metamask", "", 800);
      }
    }
  };

  return (
    <div className="wrapper">
      {/* <!-- Sidebar  --> */}
      <Sidebar />

      {/* <!-- Page Content  --> */}
      <div id="content">
        <div className="add_btn mb-4 d-flex justify-content-end">
          <button
            className="btn btn-admin text-light"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            + Add Collection
          </button>
        </div>
        <div className="adminbody table-widget text-light box-background">
          <h5 className="admintitle font-600 font-24 text-yellow">Example</h5>
          <p className="admindescription">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <table className="table table-hover text-light">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Title</th>
                <th>Description</th>
                <th>Royalty</th>
                <th>Start Date</th>
                <th>Max Supply</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
              </tr>
            </thead>
            {myCollections && myCollections != undefined && myCollections != "" && myCollections.length>0
              ? myCollections.map((item, index) => (
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src={item.logoImage}
                          className="profile_i"
                          alt=""
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{Item.royalty}</td>
                      <td>Date</td>
                      <td>{item.totalSupply}</td>
                      <td>$200</td>
                      <td>Zenjin Viperz</td>
                      <td>Hunter</td>
                    </tr>
                  </tbody>
                ))
              : "no collection"}
          </table>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-yellow font-24 font-600"
                id="exampleModalLabel"
              >
                Create New Collection
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row">
                <div className="mb-1 col-md-4">
                  <label for="recipient-name" className="col-form-label">
                    Upload Image *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={imageUploader}
                      style={{
                        display: "none",
                      }}
                    />
                    <div
                      className="update_btn"
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                      onClick={() => imageUploader.current.click()}
                    >
                      <p className="text-center">Click or Drop here</p>
                      <img
                        alt=""
                        ref={uploadedImage}
                        src={"../images/upload.png"}
                        style={{
                          width: "110px",
                          height: "110px",
                          margin: "auto",
                        }}
                        className="img-fluid profile_circle_img"
                      />
                      {/* <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div> */}
                    </div>
                  </div>
                </div>
                <div className="mb-1 col-md-8">
                  <label for="recipient-name" className="col-form-label">
                    Upload Collection Cover Image *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload2}
                      ref={imageUploader2}
                      style={{
                        display: "none",
                      }}
                    />
                    <div
                      className="update_btn"
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                      onClick={() => imageUploader2.current.click()}
                    >
                      <h4 className="text-center">Click or Drop here</h4>
                      <img
                        alt=""
                        ref={uploadedImage2}
                        src={"../images/upload.png"}
                        style={{
                          width: "110px",
                          height: "110px",
                          margin: "auto",
                        }}
                        className="img-fluid profile_circle_img"
                      />
                      {/* <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Title *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Royalty *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={royalty}
                    name="royalty"
                    onChange={(e) => setRoyalty(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Start Date *
                  </label>
                  <input
                    type="datetime-local"
                    value={(preSaleStartTime || "").toString().substring(0, 16)}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    End Date *
                  </label>
                  <input
                    type="datetime-local"
                    value={(datetime2 || "").toString().substring(0, 16)}
                    onChange={handleChange2}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Max Supply *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="recipient-name"
                    value={maxSupply}
                    onChange={(e) => {
                      let maxSupply = parseInt(e.target.value, 10);
                      console.log(
                        "max supply is-->",
                        e.target.value,
                        typeof maxSupply
                      );
                      setMaxSupply(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Price *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={price}
                    onChange={(e) => numberInputCheck(e)}
                    onKeyPress={(e) => {
                      if (!/^\d*\.?\d*$/.test(e.key)) e.preventDefault();
                    }}
                  />
                </div>
                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Category *
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Brand *
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-md-12 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Symbol *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mb-1">
                  <label for="message-text" className="col-form-label">
                    Description *
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-md-12 mb-1 mt-3">
                  <label class="radio-img">
                    <input type="radio" name="release" checked={status === 1} onClick={(e) => radioHandler(1)} />
                    <div class="image">
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M345 621 c-16 -10 -101 -90 -187 -178 -131 -132 -158 -164 -158 -188
                        0 -24 21 -50 113 -142 92 -92 118 -113 142 -113 24 0 57 28 193 163 90 89 170
                        174 178 189 10 19 14 61 14 136 0 101 -2 110 -23 130 -21 20 -34 22 -133 22
                        -89 0 -114 -3 -139 -19z m192 -83 c28 -26 30 -61 3 -88 -42 -42 -110 -14 -110
                        46 0 58 63 83 107 42z"/>
                        </g>
                      </svg>
                      <span className="font-20 font-600 text-dark">Fixed price</span>
                    </div>
                  </label>
                  <label class="radio-img">
                    <input type="radio" name="release" checked={status === 2} onClick={(e) => radioHandler(2)} />
                    <div class="image">
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M335 550 c-11 -5 -62 -9 -112 -9 -55 -1 -93 -5 -93 -11 0 -6 29 -10
                        68 -10 l67 -1 -24 -20 c-35 -29 -18 -35 21 -6 71 52 153 61 233 23 60 -28 77
                        -46 106 -110 75 -171 -89 -349 -272 -295 -117 35 -182 180 -134 296 16 37 12
                        59 -6 33 -19 -31 -31 -97 -26 -146 6 -62 24 -99 68 -142 l33 -32 -67 0 c-105
                        0 -78 -18 36 -24 56 -3 121 -8 145 -12 128 -19 262 101 262 236 0 92 -80 202
                        -166 228 -47 14 -110 15 -139 2z"/>
                        <path d="M347 500 c-137 -43 -178 -209 -77 -310 68 -68 168 -74 246 -15 35 27
                        67 87 61 113 -2 12 -9 4 -21 -23 -23 -54 -43 -74 -95 -97 -65 -30 -124 -18
                        -177 35 -72 72 -69 173 5 240 93 84 235 41 272 -83 15 -50 31 -43 17 8 -21 77
                        -79 125 -164 136 -21 3 -52 1 -67 -4z"/>
                        <path d="M45 460 c3 -5 28 -10 55 -10 27 0 52 5 55 10 4 6 -17 10 -55 10 -38
                        0 -59 -4 -55 -10z"/>
                        <path d="M390 444 c0 -8 5 -12 10 -9 6 3 10 10 10 16 0 5 -4 9 -10 9 -5 0 -10
                        -7 -10 -16z"/>
                        <path d="M295 410 c3 -5 10 -10 16 -10 5 0 9 5 9 10 0 6 -7 10 -16 10 -8 0
                        -12 -4 -9 -10z"/>
                        <path d="M480 410 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                        -10 -4 -10 -10z"/>
                        <path d="M100 400 c0 -5 11 -10 25 -10 14 0 25 5 25 10 0 6 -11 10 -25 10 -14
                        0 -25 -4 -25 -10z"/>
                        <path d="M390 361 c0 -50 1 -51 30 -51 17 0 30 5 30 10 0 6 -9 10 -20 10 -16
                        0 -20 7 -20 34 0 19 -4 38 -10 41 -6 4 -10 -13 -10 -44z"/>
                        <path d="M5 350 c8 -13 105 -13 105 0 0 6 -25 10 -56 10 -34 0 -53 -4 -49 -10z"/>
                        <path d="M260 320 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                        -10 -4 -10 -10z"/>
                        <path d="M520 320 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                        -10 -4 -10 -10z"/>
                        <path d="M5 290 c-4 -6 15 -10 49 -10 31 0 56 5 56 10 0 13 -97 13 -105 0z"/>
                        <path d="M100 240 c0 -5 11 -10 25 -10 14 0 25 5 25 10 0 6 -11 10 -25 10 -14
                        0 -25 -4 -25 -10z"/>
                        <path d="M295 230 c-3 -5 1 -10 9 -10 9 0 16 5 16 10 0 6 -4 10 -9 10 -6 0
                        -13 -4 -16 -10z"/>
                        <path d="M480 230 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                        -10 -4 -10 -10z"/>
                        <path d="M390 190 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                        -10 -4 -10 -10z"/>
                        <path d="M45 180 c-4 -6 17 -10 55 -10 38 0 59 4 55 10 -3 6 -28 10 -55 10
                        -27 0 -52 -4 -55 -10z"/>
                        </g>
                      </svg>
                      <span className="font-20 font-600 text-dark">Timed auction</span></div>
                    </label>
                    {status === 1 && (
                        <div className="col-md-12 mb-1">
                          <label for="recipient-name" className="col-form-label">
                            Price *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipient-name"
                            value={price}
                            onChange={(e) => numberInputCheck(e)}
                            onKeyPress={(e) => {
                              if (!/^\d*\.?\d*$/.test(e.key)) e.preventDefault();
                            }}
                          />
                        </div>
                    )}
                    {status === 2 && (
                        <div className="row">
                          <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">
                              Minimum bid *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="recipient-name"
                              value=""
                              onChange={(e) => MinimumbidCheck(e)}
                            />
                          </div>
                          <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">
                              Payment Token *
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              value={PaymentToken}
                              onChange={(e) => setPaymentToken(e.target.value)}
                            >
                              <option selected>USDT</option>
                              <option value="1">USDT One</option>
                              <option value="2">USDT Two</option>
                            </select>
                          </div>
                          <div className="col-md-6 mb-1">
                            <label for="Expiration-name" className="col-form-label">
                              Expiration date *
                            </label>
                            <input
                              type="datetime-local"
                              value={(datetime3 || "").toString().substring(0, 16)}
                              onChange={handleChange3}
                              className="form-control"
                            />
                          </div>
                        </div>
                    )}
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-admin text-light"
                onClick={handleCollectionCreation}
              >
                Create Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCollection;
