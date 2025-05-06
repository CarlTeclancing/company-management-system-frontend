import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg'
import { Link, useLocation } from 'react-router-dom'
import './layout.css'

function SideBar() {
    const [activeNav, setACtiveNav] = useState(0)
    const location = useLocation()
  return (
    <div className='side-nav'>
        <div className="w-100">
            <img src={logo} alt="" />

        </div>

    <>
        <Link 
            
            className={location.pathname == "/dashboard" ?"side-link-active":"side-link"} 
            to={'/dashboard'}
            
            >
            <span>Dashbaord</span>
        </Link>
        <span className="m-100">USer Management</span>
        <Link 
            className={location.pathname == "/users" ?"side-link-active":"side-link"} 
            to={'/users'}>
            <span>Users</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>Clients</span>
        </Link>
        <span className="m-100">Project Management</span>
        <Link className="side-link" to={'/'}>
            <span>Projects</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>Task</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>Meetings</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>Messages</span>
        </Link>
        <span className="m-100">Other Management</span>
        <Link className="side-link" to={'/'}>
            <span>Invoices</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>Inventory</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>Finances</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>Files</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>Analytics</span>
        </Link>
        <hr />
        <hr />
        <hr />
        <hr />
        <span className="m-100">Settings & Support</span>
        <Link className="side-link" to={'/'}>
            <span>Settings</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <span>System Support</span>
        </Link>
        
            
            
    </>
    </div>
  )
}

export default SideBar