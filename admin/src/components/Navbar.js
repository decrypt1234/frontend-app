import React from 'react';
import Message from './SVG/Message';
import Notification from './SVG/Notification';
import Wallet from './SVG/Wallet';
import { Link } from 'react-router-dom';
// import Moon from './SVG/moon';
// import Sun from './SVG/sun';

function Navbar(props) {

  return (
    <div className="admin-navbar d-flex w-100">
      
      <div className="profile_box text-light me-auto d-flex align-items-center text-uppercase montserrat font-400">
        <div className='profile_img'><img src={"../images/user.jpg"} alt="" className='img-fluid'/></div>{props.model} Decryptblock
      </div>
      <ul className="p-0 m-0">
        <li className='text-light'>
          <div className="position-relative" >
            <Message />
            <span className='badge badge-danger navbar-badge text-dark'>3</span>
          </div>
        </li>
        <li className='text-light'>
          <div className="position-relative">
            <Notification />
            <span className='badge badge-danger navbar-badge text-dark'>3</span>
          </div>
        </li>
        <li><Link to={'/'} className="round-btn montserrat text-light text-decoration-none"><Wallet /> x01a5x21...</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
