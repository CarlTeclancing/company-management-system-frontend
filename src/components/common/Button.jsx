import React from 'react'
import './common.css'

function Button({value, type}) {
  return (
    <button className={type}>{value}</button>
  )
}

export default Button