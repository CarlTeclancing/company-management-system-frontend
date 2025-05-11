import React from 'react'
import InputField from '../auth/InputField'
import notificationIcon from '../../assets/icons/notification-icon.png'
import userImg from '../../assets/icons/userImg.png'
function TopBar( {logout}) {
  return (
    <div className='top-nav'>
        <div className='w-50'></div>
        <InputField
            label=""
            name="search"
            type="text"
            value={""}
            onChange={"typpping"}
            placeholder="Enter search tearm"
            error={""}
        />
        <div className='profile-notification'>
            <img src={notificationIcon} alt="" />
            <img src={userImg} alt="" />
            <div className='profile-dropdown'>
                <ul>
                    <li onClick={logout}>Logout</li>
                    <li>Settings</li>
                    <li>Profile</li>
                </ul>
            </div>
        </div>

    </div>
  )
}

export default TopBar