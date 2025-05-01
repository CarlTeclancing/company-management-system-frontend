import React from 'react'
import InputField from '../auth/InputField'
import notificationIcon from '../../assets/icons/notification-icon.png'
import userImg from '../../assets/icons/userImg.png'
function TopBar() {
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
        
        </div>

    </div>
  )
}

export default TopBar