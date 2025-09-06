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
                <th>Description</th>
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
                            <Link to={`/inventory/add-single/${products.id}`} state={{productsId:products.id, productsName:products.name, productDesc: products.description, productPrice:products.price, productQuantity:products.quantity}}>
                                <li>
                                    <i className="bi bi-arrow-right-short"></i>+ Product 
                                </li>
                            </Link>
                            <Link to={`/inventory/subtract-single/${products.id}`} state={{productsId:products.id, productsName:products.name, productDesc: products.description, productPrice:products.price, productQuantity:products.quantity}}>
                                <li><i className="bi bi-arrow-right-short"></i>- Product</li>
                            </Link>
                            <Link to={`/inventory/edit-product/${products.id}`} state={{productsId:products.id, productsName:products.name, productDesc: products.description, productPrice:products.price, productQuantity:products.quantity}}>
                                <li><i className="bi bi-arrow-right-short"></i>Edit</li>
                            </Link>
                            <Link to={`/inventory/delete/${products.id}`} state={{productId:products.id}}>
                                <li><i className="bi bi-arrow-right-short"></i>Delete</li>
                            </Link>
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
