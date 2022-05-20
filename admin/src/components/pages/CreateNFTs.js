import React from 'react';
import Sidebar from '../components/Sidebar';

function CreateNFTs() {
  return (
    <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        <Sidebar />

        {/* <!-- Page Content  --> */}
        <div id="content">
            <div className='add_btn mb-4 d-flex justify-content-end'>
                <button className="btn btn-admin text-light" type='button'>+ Add Collection</button>
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
    </div>
  )
}

export default CreateNFTs
