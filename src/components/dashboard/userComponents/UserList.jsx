import React from 'react'
import userImg from '../../../assets/images/user1.png'

function UserList() {
  return (
    <>
        <table>
            <thead>
                <tr>
                    <th>Img</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>
            </thead>

            <tbody>
                <tr>
                    <td><img src={userImg} alt="" /></td>
                    <td>1</td>
                    <td>Yuven Carlson</td>
                    <td>yuvcarl@email.com</td>
                    <td>4040404004</td>
                    <td>cameroon</td>
                    <td>Active</td>
                    <td>...</td>

                </tr>
                <tr>
                    <td><img src={userImg} alt="" /></td>
                    <td>1</td>
                    <td>Yuven Carlson</td>
                    <td>yuvcarl@email.com</td>
                    <td>4040404004</td>
                    <td>cameroon</td>
                    <td>Active</td>
                    <td>...</td>

                </tr>
            </tbody>
        </table>  
    </>
  )
}

export default UserList