import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { connect } from "react-redux";
import { createCollection, exportInstance } from "../../apiServices";
import contracts from "../../config/contracts";
import degnrABI from "./../../config/abis/dgnr8.json";
import { ethers } from "ethers";
//import Loader from "../components/loader";
import { NotificationManager } from "react-notifications";

function CreateCollection() {
  const [files, setFiles] = useState([]);
  const [logoImg, setLogoImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [title, setTitle] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [loading, setLoading] = useState(false);
  const [maxSupply, setMaxSupply] = useState();
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [datetime, setDatetime] = useState("");
  const [datetime2, setDatetime2] = useState("");

  function handleChange(ev) {
    if (!ev.target["validity"].valid) return;
    const dt = ev.target["value"] + ":00Z";
    setDatetime(dt);
  }

  function handleChange2(evv) {
    if (!evv.target["validity"].valid) return;
    const dtt = evv.target["value"] + ":00Z";
    setDatetime2(dtt);
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

  const readReceipt = async (hash) => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.getTransactionReceipt(hash.hash);
    let contractAddress = receipt.logs[0].address;
    return contractAddress;
  };

  const handleValidationCheck = () => {
   

    if (logoImg === "" || logoImg === undefined) {
      NotificationManager.error("Please Upload a Logo Image.", "", 1000);
      return false;
    }
    if (
      coverImg === "" ||
      coverImg === undefined
    ) {
      NotificationManager.error("Please Upload a Cover Image.");
      return false;
    }
    if (
      title === "" ||
      title === undefined
    ) {
      NotificationManager.error("Please Enter a Title");
      return false;
    }
    if (title.trim()) {
      NotificationManager.error("Space(s) not allowed in Title.");
      return false;
    }
    if (
      royalty === "" ||
      royalty === undefined
    ) {
      NotificationManager.error("Please Enter the value for Royalty.");
      return false;
    }
    if (royalty.trim()) {
      NotificationManager.error("Space(s) not allowed in Royalty.");
      return false;
    }
    if (datetime === "" || datetime === undefined) {
      NotificationManager.error("Please Choose a Valid Start Date.");
      return false;
    }
    if (datetime2 === "" || datetime2 === undefined) {
      NotificationManager.error("Please Choose a Valid End Date.");
      return false;
    }
    if (
      maxSupply === "" ||
      maxSupply === undefined
    ) {
      NotificationManager.error("Please Enter Max Supply.");
      return false;
    }
    if (price === "" || price === undefined) {
      NotificationManager.error("Please Enter a Price");
      return false;
    }
    if (price.trim()) {
      NotificationManager.error("Space(s) not allowed in Price.");
      return false;
    }
    if (
      category === "" ||
      category === undefined
    ) {
      NotificationManager.error("Please Choose a Category.");
      return false;
    }
    if (brand === "" || brand === undefined) {
      NotificationManager.error("Please Choose a Brand.");
      return false;
    }
    if (
      symbol === "" ||
      symbol === undefined
    ) {
      NotificationManager.error("Symbol can't be empty.");
      return false;
    }
    if (symbol.trim()) {
      NotificationManager.error("Space(s) not allowed in Symbol.");
      return false;
    }
    if (
      description === "" ||
      description === undefined
    ) {
      NotificationManager.error(
        "Please Enter a Description for your collection."
      );
      return false;
    }
    if (description.trim()) {
      NotificationManager.error("Space(s) not allowed in Description.");
      return false;
    }
    return true;
  };

  //handle collection creator
  const handleCollectionCreation = async () => {
    if (handleValidationCheck()) {
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
              "www.image.com",
              1000,
              contracts.USDT
            ));
      } catch (e) {
        console.log(e);
      }
      let hash = res1;
      res1 = await res1.wait();
      if (res1.status === 1) {
        let contractAddress = await readReceipt(hash);
        console.log("contract address is--->", contractAddress);
        var fd = new FormData();

        fd.append("sName", title);
        fd.append("sDescription", description);
        fd.append("nftFile", logoImg);
        fd.append("sContractAddress", contractAddress);
        fd.append("erc721", JSON.stringify(true));
      }
    }
  };

  return (
    <div className='wrapper'>
      {/* <!-- Sidebar  --> */}
      <Sidebar />

      {/* <!-- Page Content  --> */}
      <div id='content'>
        <div className='add_btn mb-4 d-flex justify-content-end'>
          <button
            className='btn btn-admin text-light'
            type='button'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'>
            + Add Collection
          </button>
        </div>
        <div className='adminbody table-widget text-light box-background'>
          <h5 className='admintitle font-600 font-24 text-yellow'>Example</h5>
          <p className='admindescription'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <table className='table table-hover text-light'>
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
            <tbody>
              <tr>
                <td>
                  <img src='../images/user.jpg' className='profile_i' alt='' />
                </td>
                <td>Cat has Guns</td>
                <td>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </td>
                <td>$200</td>
                <td>Date</td>
                <td>24</td>
                <td>$200</td>
                <td>Zenjin Viperz</td>
                <td>Hunter</td>
              </tr>
              <tr>
                <td>
                  <img src='../images/user.jpg' className='profile_i' alt='' />
                </td>
                <td>Cat has Guns</td>
                <td>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </td>
                <td>$200</td>
                <td>Date</td>
                <td>24</td>
                <td>$200</td>
                <td>Zenjin Viperz</td>
                <td>Hunter</td>
              </tr>
              <tr>
                <td>
                  <img src='../images/user.jpg' className='profile_i' alt='' />
                </td>
                <td>Cat has Guns</td>
                <td>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </td>
                <td>$200</td>
                <td>Date</td>
                <td>24</td>
                <td>$200</td>
                <td>Zenjin Viperz</td>
                <td>Hunter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        className='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                className='modal-title text-yellow font-24 font-600'
                id='exampleModalLabel'>
                Create New Collection
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form className='row'>
                <div className='mb-1 col-md-4'>
                  <label for='recipient-name' className='col-form-label'>
                    Upload Image *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      ref={imageUploader}
                      style={{
                        display: "none",
                      }}
                    />
                    <div
                      className='update_btn'
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                      onClick={() => imageUploader.current.click()}>
                      <p className='text-center'>Click or Drop here</p>
                      <img
                        alt=''
                        ref={uploadedImage}
                        src={"../images/upload.png"}
                        style={{
                          width: "110px",
                          height: "110px",
                          margin: "auto",
                        }}
                        className='img-fluid profile_circle_img'
                      />
                      {/* <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div> */}
                    </div>
                  </div>
                </div>
                <div className='mb-1 col-md-8'>
                  <label for='recipient-name' className='col-form-label'>
                    Upload Collection Cover Image *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload2}
                      ref={imageUploader2}
                      style={{
                        display: "none",
                      }}
                    />
                    <div
                      className='update_btn'
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                      onClick={() => imageUploader2.current.click()}>
                      <h4 className='text-center'>Click or Drop here</h4>
                      <img
                        alt=''
                        ref={uploadedImage2}
                        src={"../images/upload.png"}
                        style={{
                          width: "110px",
                          height: "110px",
                          margin: "auto",
                        }}
                        className='img-fluid profile_circle_img'
                      />
                      {/* <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div> */}
                    </div>
                  </div>
                </div>
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Title *
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    name='title'
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Royalty *
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    value={royalty}
                    name='royalty'
                    onChange={(e) => setRoyalty(e.target.value)}
                  />
                </div>
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Start Date *
                  </label>
                  <input
                    type='datetime-local'
                    value={(datetime || "").toString().substring(0, 16)}
                    onChange={handleChange}
                    className='form-control'
                  />
                </div>
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    End Date *
                  </label>
                  <input
                    type='datetime-local'
                    value={(datetime2 || "").toString().substring(0, 16)}
                    onChange={handleChange2}
                    className='form-control'
                  />
                </div>
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Max Supply *
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='recipient-name'
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
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Price *
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Category *
                  </label>
                  <select
                    class='form-select'
                    aria-label='Default select example'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option selected>Open this select menu</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                </div>
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Brand *
                  </label>
                  <select
                    class='form-select'
                    aria-label='Default select example'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}>
                    <option selected>Open this select menu</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                </div>
                <div className='col-md-12 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Symbol *
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </div>
                <div className='col-md-12 mb-1'>
                  <label for='message-text' className='col-form-label'>
                    Description *
                  </label>
                  <textarea
                    className='form-control'
                    id='message-text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
              </form>
            </div>
            <div className='modal-footer justify-content-center'>
              <button
                type='button'
                className='btn btn-admin text-light'
                onClick={handleCollectionCreation}>
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
