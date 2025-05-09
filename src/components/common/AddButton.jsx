import React from 'react'
import './common.css'
import add from '../../assets/icons/plus.png'

function AddButton({value, type, onClick}) {
  return (
    <button className={type} onClick={onClick}><img src={add} alt="add icon" />{value}</button>
  )
}

export default AddButton