import React from 'react'

function NFToffer() {
  return (
    <div className='row'>
      <div className='col-md-2'>
          <ul className="nft_list">
              <h6>FROM</h6>
              <li><span className="yellow_dot circle_dot"></span>0xc8b...6d74</li>
              <li><span className="lightblue_dot circle_dot"></span>0xc8b...6d74</li>
              <li><span className="blue_dot circle_dot"></span>0xc8b...6d74</li>
          </ul>
      </div>
      <div className='col-md-2'>
        <ul className="nft_list">
          <h6>PRICE</h6>
          <li><img alt='' src={'../img/favicon.png'} class="img-fluid hunter_fav" /> 5.02</li>
          <li><img alt='' src={'../img/favicon.png'} class="img-fluid hunter_fav" /> 5.02</li>
          <li><img alt='' src={'../img/favicon.png'} class="img-fluid hunter_fav" /> 5.02</li>
        </ul>
      </div>
      <div className='col-md-2'>
        <ul className="nft_list">
          <h6>DATE</h6>
          <li>15/03/2022  <span className="nft_time">23:13</span></li>
          <li>15/03/2022  <span className="nft_time">23:13</span></li>
          <li>15/03/2022  <span className="nft_time">23:13</span></li>
        </ul>
      </div>
      <div className='col-md-2'>
        <ul className="nft_list">
          <h6>STATUS</h6>
          <li className="blue_text">Active</li>
          <li className="green_text">Filled</li>
          <li className="red_text">Cancelled</li>
        </ul>
      </div>
      <div className='col-md-2'>
        <ul className="nft_list">
          <h6>ACTION</h6>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default NFToffer
