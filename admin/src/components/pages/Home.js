import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Walletsvg from '../SVG/walletsvg';
import Buketsvg from '../SVG/buketsvg';
import Sellsvg from '../SVG/sellsvg';
import Chart from 'react-apexcharts'

export default function Home() {

  const [state, setState] = useState({
    options: {
      colors: ['#ef971d'],
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      },
      
      
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  })


  return (
      <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        <Sidebar />

        {/* <!-- Page Content  --> */}
        <div id="content">
            <div className='boxrow row'>
              <div className='col-xxl-3 col-md-6 mb-4'>
                <div className='boxcol box-background adminbody'>
                  <div className='svg_icon'>
                    <Walletsvg />
                  </div>
                    <h4 className='font-24 font-600 text-light mb-3'>Connect your Wallet</h4>
                    <p className='text-light font-400'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
                </div>
              </div>
              <div className='col-xxl-3 col-md-6 mb-4'>
                <div className='boxcol box-background adminbody'>
                  <div className='svg_icon'>
                    <Buketsvg />
                  </div>
                    <h4 className='font-24 font-600 text-light mb-3'>Buy NFTs</h4>
                    <p className='text-light font-400'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
                </div>
              </div>
              <div className='col-xxl-3 col-md-6 mb-4'>
                <div className='boxcol box-background adminbody'>
                  <div className='svg_icon'>
                    <Sellsvg />
                  </div>
                    <h4 className='font-24 font-600 text-light mb-3'>Sell NFTs</h4>
                    <p className='text-light font-400'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
                </div>
              </div>
              <div className='col-xxl-3 col-md-6 mb-4'>
                <div className='boxcol box-background adminbody'>
                  <div className='svg_icon'>
                    <Walletsvg />
                  </div>
                    <h4 className='font-24 font-600 text-light mb-3'>Connect your Wallet</h4>
                    <p className='text-light font-400'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <div className='box-background adminbody'>
                  <Chart options={state.options} series={state.series} type="line"  />
                </div>
              </div>
              <div className='col-md-6 mb-3'>
                <div className='box-background adminbody'>
                  <Chart options={state.options} series={state.series} type="area"  />
                </div>
              </div>
              <div className='col-md-6 mb-3'>
                <div className='box-background adminbody'>
                  <Chart options={state.options} series={state.series} type="bar"  />
                </div>
              </div>
              <div className='col-md-6 mb-3'>
                <div className='box-background adminbody'>
                  <Chart options={state.options} series={state.series} type="radar"  />
                </div>
              </div>
            </div>

        </div>
    </div>
  )
}
