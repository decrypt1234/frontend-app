import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import Sidebar from "../components/Sidebar";

function CreateNFTs() {
  const [nftImg, setNftImg] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState();
  const [brand, setBrand] = useState();

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
    }
    if (e.target.files && e.target.files[0]) {
      setNftImg(e.target.files[0]);
    }
  };

  const handleValidationCheck = () => {
  
    if (nftImg === "" || nftImg === undefined) {
      NotificationManager.error("Please upload a Image", "", 1000);
      return false;
    }
    if (title.trim() === "" || title === undefined) {
        NotificationManager.error("Please Enter a Title", "", 1000);
        return false;
      }
    if(description.trim() === "" || description === undefined)
    {
        NotificationManager.error("Please Enter a description", "", 1000);
        return false;
    }
    if(collection === "" || collection === undefined)
    {
        NotificationManager.error("please choose a collection","",1000);
        return false;
    }
    if(brand === "" || brand === undefined)
    {
        NotificationManager.error("Please choose a brand","",1000);
        return false;
    }
    return true;
  };

  const handleCreateNFT = () => {
    if(handleValidationCheck())
    {
       // create NFT logic
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
            data-bs-target='#NftModal'>
            + Add NFTs
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
          <table class='table table-hover text-light'>
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
        id='NftModal'
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
                <div className='mb-1 col-md-4 offset-md-4'>
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
                {/* <div className="mb-1 col-md-8">
                            <div className="mb-1">
                                <label for="recipient-name" className="col-form-label">Title *</label>
                                <input type="text" className="form-control" id="recipient-name" />
                            </div>
                            <div className="mb-1">
                                <label for="message-text" className="col-form-label">Description *</label>
                                <textarea className="form-control" id="message-text" rows={4}></textarea>
                            </div>
                        </div> */}
                <div className='col-md-12 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Title *
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Royalty *</label>
                            <input type="text" className="form-control" id="recipient-name" />
                        </div> */}
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

                {/* <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Start Date *</label>
                            <input type="datetime-local" value={(datetime || '').toString().substring(0, 16)} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">End Date *</label>
                            <input type="datetime-local" value={(datetime2 || '').toString().substring(0, 16)} onChange={handleChange2} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Max Supply *</label>
                            <input type="text" className="form-control" id="recipient-name" />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Price *</label>
                            <input type="text" className="form-control" id="recipient-name" />
                        </div> */}
                <div className='col-md-6 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Choose Collection *
                  </label>
                  <select
                    class='form-select'
                    aria-label='Default select example'
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}>
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
              </form>
            </div>
            <div className='modal-footer justify-content-center'>
              <button
                type='button'
                className='btn btn-admin text-light'
                onClick={handleCreateNFT}>
                Create Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFTs;
