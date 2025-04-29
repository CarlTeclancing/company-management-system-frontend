import React from 'react'
import './common.css'
import arrow from '../../assets/icons/arrow-45.png'

function Widget( {title, value, valueUp, message}) {
  return (
    <div className='widget'>
        <h3>{title}</h3>
        <div className="widget-row">
            <h1>{value}</h1>
            <span>{valueUp} <img src={arrow} alt="" /></span>
        </div>
        <p>{message}</p>
        <div className='widget-footer'>
            View More <img src={arrow} alt="" />
        </div>
    </div>
  )
}

export default Widget