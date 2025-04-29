import React from 'react'
import './common.css'
import add from '../../assets/icons/plus.png'

function AddButton({value, type}) {
  return (
    <button className={type}><img src={add} alt="add icon" />{value}</button>
  )
}

export default AddButton