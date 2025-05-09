import React from 'react'
import './common.css'
import add from '../../assets/icons/plus.png'

function AddButton({value, type, onClick}) {
  return (
    <button className={type}><img src={add} alt="add icon" onClick={onClick}/>{value}</button>
  )
}

export default AddButton