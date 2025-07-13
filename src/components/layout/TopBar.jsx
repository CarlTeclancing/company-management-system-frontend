import React from 'react'
import InputField from '../auth/InputField'
import notificationIcon from '../../assets/icons/notification-icon.png'
import userImg from '../../assets/icons/userImg.png'
import Button from '../common/button'
function TopBar( {logout}) {
  return (
    <div className='top-nav'>
        <div className='w-50'></div>
        <input type="search" name="search" placeholder='Enter Seach term' id="" className="w-10" />
        <div className='profile-notification'>
            <img src={notificationIcon} alt="" />

            <div className='notification-dropdown'>
                <h2>Notifications</h2>
                <hr />
                <div className="notification active-notification">
                    <h3>New Task Added to you</h3>
                    <p>Complete the quarterly report by Friday</p>
                    <p>2 hours ago</p>
                </div>
                <div className="notification">
                    <h3>New Task Added to you</h3>
                    <p>Complete the quarterly report by Friday</p>
                    <p>2 hours ago</p>
                </div>
                <hr />
                <Button value={"View All"} type={'btn-secondary-100'} />
            </div>
        </div>
            <div className='dropdown'>
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