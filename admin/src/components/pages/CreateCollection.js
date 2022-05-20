import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ImageUploading from 'react-images-uploading';


function CreateCollection() {

    const [ datetime, setDatetime ] = useState('');

    function handleChange(ev) {
        if (!ev.target['validity'].valid) return;
        const dt= ev.target['value'] + ':00Z';
        setDatetime(dt);
      }

      const [images, setImages] = React.useState([]);
        const maxNumber = 69;

        const onChange = (imageList, addUpdateIndex) => {
            // data for submit
            console.log(imageList, addUpdateIndex);
            setImages(imageList);
        };

  return (
    <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        <Sidebar />

        {/* <!-- Page Content  --> */}
        <div id="content">
            <div className='add_btn mb-4 d-flex justify-content-end'>
                <button className="btn btn-admin text-light" type='button' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add Collection</button>
            </div>
            <div className="adminbody table-widget text-light box-background">
                <h5 className="admintitle font-600 font-24 text-yellow">Example</h5>
                <p className="admindescription">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
                    <tbody>
                    <tr>
                        <td><img src='../images/user.jpg' className="profile_i" alt='' /></td>
                        <td>Cat has Guns</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</td>
                        <td>$200</td>
                        <td>Date</td>
                        <td>24</td>
                        <td>$200</td>
                        <td>Zenjin Viperz</td>
                        <td>Hunter</td>
                    </tr>
                    <tr>
                        <td><img src='../images/user.jpg' className="profile_i" alt='' /></td>
                        <td>Cat has Guns</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</td>
                        <td>$200</td>
                        <td>Date</td>
                        <td>24</td>
                        <td>$200</td>
                        <td>Zenjin Viperz</td>
                        <td>Hunter</td>
                    </tr>
                    <tr>
                        <td><img src='../images/user.jpg' className="profile_i" alt='' /></td>
                        <td>Cat has Guns</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</td>
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
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                                {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                                }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <button
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className="update_btn image_update"
                                    >
                                    <p>Click or Drop here</p>
                                    <img src='../images/upload.png' alt=''/>
                                    </button>
                                    &nbsp;
                                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                    {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                )}
                            </ImageUploading>
                        </div>
                        <div className="mb-1 col-md-8">
                            <label for="recipient-name" className="col-form-label">Upload Collection Cover Image *</label>
                            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                                {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                                }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <button
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className="update_btn"
                                    >
                                    <h4>Click or Drop here</h4>
                                    <img src='../images/upload.png' alt=''/>
                                    </button>
                                    &nbsp;
                                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                    {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                )}
                            </ImageUploading>
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Title *</label>
                            <input type="text" className="form-control" id="recipient-name" />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Royalty *</label>
                            <input type="text" className="form-control" id="recipient-name" />
                        </div>
                        <div className="col-md-12 mb-1">
                            <label for="message-text" className="col-form-label">Description *</label>
                            <textarea className="form-control" id="message-text"></textarea>
                        </div>
                        
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Start Date *</label>
                            <input type="datetime-local"
  value={(datetime || '').toString().substring(0, 16)}
  onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">End Date *</label>
                            <input type="datetime-local"
  value={(datetime || '').toString().substring(0, 16)}
  onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Max Supply *</label>
                            <input type="text" className="form-control" id="recipient-name" />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Price *</label>
                            <input type="text" className="form-control" id="recipient-name" />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Category *</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-1">
                            <label for="recipient-name" className="col-form-label">Brand *</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
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

export default CreateCollection
