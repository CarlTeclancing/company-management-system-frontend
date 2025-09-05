import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../../../globals';

const AllInventory = () => {
        const [inventoryData, setInventoryData] = useState([]);

        //getting the company id from authcontext
          const {
            companyId,
          } = useAuth();

       useEffect(() => { 
            if (companyId) {
            // Fetch invoice details using invoiceId
            const company_id = companyId;
            const fetchInventoryData = async () => {
                try {
                const response = await axios.get(`${BASE_URL}/inventory/company/${company_id}`)
                setInventoryData(response.data);
                console.log(inventoryData);

                } catch (error) {
                console.error('Error fetching Inventory data:', error);
                }
            }

            fetchInventoryData();
            }
        }, [companyId])
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
            {inventoryData.map((products) =>(

            <tr>
                <td>{products.id}</td>
                <td>{products.name}</td>
                <td>{products.description}</td>
                <td>{products.quantity}</td>
                <td>{products.price}</td>
                <td>{products.status}</td>
                <td className='drop'>
                    <i className="bi bi-three-dots"></i>
                    <div className="drop-down">
                        <ul>
                            <Link>
                                <li>
                                    <i className="bi bi-plus"></i>product
                                </li>
                            </Link>
                            <li><i className="bi bi-subtract"></i> Product</li>
                            <li><i className="bi bi-trash"></i>- Delete</li>
                        </ul>
                    </div>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default AllInventory
