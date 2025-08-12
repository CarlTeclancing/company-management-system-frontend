import React from 'react'
import Layout from '../../layout/Layout'
import { Link } from 'react-router-dom'

const AllInventory = () => {
  return (
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <br /><br />

        <tbody>
            <tr>
                <td>22323</td>
                <td>22323</td>
                <td>22323</td>
                <td>22323</td>
                <td>22323</td>
                <td>22323</td>
                <td className='drop'>
                    <i className="bi bi-three-dots"></i>
                    <div className="drop-down">
                        <ul>
                            <Link>
                                <li>
                                    <i className="bi bi-eye"></i> View
                                </li>
                            </Link>
                            <li><i className="bi bi-pencil-square"></i> Edit</li>
                            <li><i className="bi bi-trash"></i> Delete</li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
  )
}

export default AllInventory
