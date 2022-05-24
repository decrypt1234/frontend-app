import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

function CreateBrands() {


        const uploadedImage = React.useRef(null);
        const imageUploader = React.useRef(null);
        
        const handleImageUpload = e => {
            const [file] = e.target.files;
            if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
            }
        };

        const uploadedImage2 = React.useRef(null);
        const imageUploader2 = React.useRef(null);
        
        const handleImageUpload2 = e => {
            const [file] = e.target.files;
            if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage2;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
            }
        };

        
  return (
    <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        <Sidebar />

        {/* <!-- Page Content  --> */}
        <div id="content">
            <div className='add_btn mb-4 d-flex justify-content-end'>
                <button className="btn btn-admin text-light" type='button' data-bs-toggle="modal" data-bs-target="#brandModal">+ Add Brand</button>
            </div>
            <div className="adminbody table-widget text-light box-background">
                <h5 className="admintitle font-600 font-24 text-yellow">Example</h5>
                <p className="admindescription">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <table class="table table-hover text-light">
                    <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><img src='../images/user.jpg' className="profile_i" alt='' /></td>
                        <td>Cat has Guns</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</td>
                    </tr>
                    <tr>
                        <td><img src='../images/user.jpg' className="profile_i" alt='' /></td>
                        <td>Cat has Guns</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</td>
                    </tr>
                    <tr>
                        <td><img src='../images/user.jpg' className="profile_i" alt='' /></td>
                        <td>Cat has Guns</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="modal fade" id="brandModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-yellow font-24 font-600" id="exampleModalLabel">Create New Collection</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className='row'>
                        <div className="mb-1 col-md-4">
                            <label for="recipient-name" className="col-form-label">Upload Image *</label>
                            <div
                                style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                                }}
                            >
                                <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                ref={imageUploader}
                                style={{
                                    display: "none"
                                }}
                                />
                                <div className="update_btn"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        position: "relative"
                                    }}
                                    onClick={() => imageUploader.current.click()}
                                >
                                    <p className='text-center'>Click or Drop here</p>
                                    <img alt='' ref={uploadedImage} src={'../images/upload.png'} 
                                    style={{
                                    width: "110px",
                                    height: "110px",
                                    margin: "auto"
                                    }}
                                    className="img-fluid profile_circle_img" />
                                    {/* <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div> */}
                                </div>
                            </div>
                        </div>
                        <div className="mb-1 col-md-8">
                            <label for="recipient-name" className="col-form-label">Upload Collection Cover Image *</label>
                            <div
                                style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                                }}
                            >
                                <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload2}
                                ref={imageUploader2}
                                style={{
                                    display: "none"
                                }}
                                />
                                <div className="update_btn"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        position: "relative"
                                    }}
                                    onClick={() => imageUploader2.current.click()}
                                >
                                    <h4 className='text-center'>Click or Drop here</h4>
                                    <img alt='' ref={uploadedImage2} src={'../images/upload.png'} 
                                    style={{
                                    width: "110px",
                                    height: "110px",
                                    margin: "auto"
                                    }}
                                    className="img-fluid profile_circle_img" />
                                    {/* <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-1">
                            <label for="recipient-name" className="col-form-label">Title *</label>
                            <input type="text" className="form-control" id="recipient-name" />
                        </div>
                        <div className="col-md-12 mb-1">
                            <label for="message-text" className="col-form-label">Description *</label>
                            <textarea className="form-control" id="message-text"></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="button" className="btn btn-admin text-light">Create Collection</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateBrands
