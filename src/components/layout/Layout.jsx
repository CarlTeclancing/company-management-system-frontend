import React, { Children } from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'

function Layout( {children}) {
  return (
    <div className='container'>
        <SideBar />
        <div className="col">
            <TopBar />
            {children}
        </div>
    </div>
  )
}

export default Layout