import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const ClientList = () => {
  return (
    <table>
      
    <thead>
      <tr>
        <th>Client Name</th>
        <th>Company</th>
        <th>Number</th>
        <th>Email</th>
        <th>Project Count</th>
        <th>Date Added</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

        <tr >
          <td></td>
          <td></td>
          <td>yuven carlson</td>
          <td>yayo</td>
          <td>33344433</td>
          <td>yoaunde</td>
          <td></td>
          <td className='drop'>
            <i class="bi bi-three-dots"></i>
            <div className="drop-down">
              <ul>
                <Link 
                  to={`/users/edit/`}
                  state={1}
                  >
                  <li><i class="bi bi-pencil-square"></i> Edit</li>
                </Link>
                <Link 
                to={`/users/delete/`}
                state={1}
                >
                  <li><i class="bi bi-trash"></i> Delete</li>
                </Link>
                <Link to={`/users/view/`}>
                  <li><i class="bi bi-eye"></i> View</li>
                </Link>
              </ul>
            </div>
          </td>
        </tr>
    </tbody>
  </table>
  )
}

export default ClientList
