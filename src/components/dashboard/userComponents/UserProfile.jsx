import React from 'react'
import Button from '../../common/button'
import userImg from '../../../assets/images/user1.png'

function UserProfile() {
  return (
    <div className='user-profile'>
        <img src={userImg} alt="" />
        <h3>Yuven Carlson</h3>
        <p>Sinor Product Designer</p>
        <p>codewithcrest@gmail.com</p>
        <p>237 672765292</p>
        <p>Engineering</p>
        <p>Simbock Younde</p>
        <Button value={"Message"} type={'btn-primary-100'} />
    </div>
  )
}

export default UserProfile