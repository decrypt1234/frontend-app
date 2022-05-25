import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import Deletesvg from "../SVG/deletesvg";

function CreateCategories() {
  const [catImg, setCatImg] = useState();
  const [CategorieName, setCategorieName] = useState("");

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
        setCatImg(e.target.files[0]);
      }
    }
   
  };

  const handleValidationCheck = () => {
  
    if (catImg === "" || catImg === undefined) {
      NotificationManager.error("Please Upload an Categorie Image", "", 800);
      return false;
    }
    if (CategorieName.trim() === "" || CategorieName === undefined) {
        NotificationManager.error("Please Enter a Categorie Name", "", 800);
        return false;
      }
    return true;
  };

  const handleCreateCategorie = () => {
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
                <th>Name</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src='../images/user.jpg' className='profile_i' alt='' /></td>
                    <td>
                    Categorie Name
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <Link to={"/"} class="btn btn-danger"><Deletesvg /></Link>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><img src='../images/user.jpg' className='profile_i' alt='' /></td>
                    <td>
                    Categorie Name
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <Link to={"/"} class="btn btn-danger"><Deletesvg /></Link>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><img src='../images/user.jpg' className='profile_i' alt='' /></td>
                    <td>
                    Categorie Name
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <Link to={"/"} class="btn btn-danger"><Deletesvg /></Link>
                        </div>
                    </td>
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
                Create New Categorie
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
                    Upload Categorie Image *
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
                <div className='col-md-12 mb-1'>
                  <label for='recipient-name' className='col-form-label'>
                    Categorie Name *
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    value={CategorieName}
                    onChange={(e) => setCategorieName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer justify-content-center'>
              <button
                type='button'
                className='btn btn-admin text-light'
                onClick={handleCreateCategorie}>
                Create Categorie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCategories;