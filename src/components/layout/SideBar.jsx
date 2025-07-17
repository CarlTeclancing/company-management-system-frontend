import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg'
import { Link, useLocation } from 'react-router-dom'
import './layout.css'
import { Icon } from '@iconify/react/dist/iconify.js'

function SideBar() {
    const [activeNav, setACtiveNav] = useState(0)
    const location = useLocation()
  return (
    <div className='side-nav'>
        <div className="w-100">
            <img src={logo} alt="" />

        </div>

    <>
    <span className="m-100">General</span>
        <Link 
            
            className={location.pathname == "/dashboard" ?"side-link-active":"side-link"} 
            to={'/dashboard'}
            
            >
            <i class="bi bi-house"></i> 
            <span>Dashbaord</span>
        </Link>
        <Link 
            
            className={location.pathname == "/" ?"side-link-active":"side-link"} 
            to={'/dashboard'}
            
            >
            <i class="bi bi-openai"></i>
            <span>Projina AI</span>
        </Link>
        <span className="m-100">USer Management</span>
        <Link 
            className={location.pathname == "/users" ?"side-link-active":"side-link"} 
            to={'/users'}>
            <i class="bi bi-people"></i>
            <span>Users</span>
        </Link>
        <Link className={location.pathname == "/clients" ?"side-link-active":"side-link"} to={'/clients'}>
            <i class="bi bi-person-vcard"></i>
            <span>Clients</span>
        </Link>
        <span className="m-100">Project Management</span>
        <Link className={((location.pathname == "/projects") || (location.pathname == "/projects/edit/:id")) ?"side-link-active":"side-link"} to={'/projects'}>
            <i class="bi bi-folder"></i>
            <span>Projects</span>
        </Link>
        <Link className={location.pathname == "/task" ?"side-link-active":"side-link"} to={'/task'}>
            <i class="bi bi-calendar-check"></i>
            <span>Task</span>
        </Link>
        <Link className={location.pathname == "/meetings" ?"side-link-active":"side-link"} to={'/meetings'}>
            <i class="bi bi-calendar-week"></i>
            <span>Meetings</span>
        </Link>
        <Link className={location.pathname == "/messages" ?"side-link-active":"side-link"} to={'/messages'}>
            <i class="bi bi-chat-dots"></i>
            <span>Messages</span>
        </Link>
        <span className="m-100">Other Management</span>
        <Link className={location.pathname == "/invoices" ?"side-link-active":"side-link"} to={'/invoices'}>
            <i class="bi bi-receipt"></i>
            <span>Invoices</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <i class="bi bi-box-seam"></i>
            <span>Inventory</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <i class="bi bi-piggy-bank"></i>
            <span>Finances</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <i class="bi bi-folder"></i>
            <span>Files</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <i class="bi bi-bar-chart"></i>
            <span>Analytics</span>
        </Link>
        <hr />
        <hr />
        <hr />
        <hr />
        <span className="m-100">Settings & Support</span>
        <Link className={location.pathname == "/dashboard/settings" ?"side-link-active":"side-link"} to={'/dashboard/settings'}>
            <i class="bi bi-gear"></i>
            <span>Settings</span>
        </Link>
        <Link className="side-link" to={'/'}>
            <i class="bi bi-headset"></i>
            <span>System Support</span>
        </Link>
        
            
            
    </>
    </div>
  )
}

export default SideBar