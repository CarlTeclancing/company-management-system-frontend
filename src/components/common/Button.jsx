import React from 'react'
import './common.css'

//this button component can tke a value for the text to be on the utton and a type that take the css style 
//we have two types of buttons btn-primary and btn-secondary and btn-primary-100

function Button({value, type}) {
  return (
    <button className={type}>{value}</button>
  )
}

export default Button