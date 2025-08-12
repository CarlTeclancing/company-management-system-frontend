import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import AddButton from '../../components/common/AddButton'
import AllInventory from '../../components/dashboard/inventory/AllInventory'
import { Link } from 'react-router-dom'
import AddCategory from '../../components/dashboard/inventory/AddCategory'
import AddProduct from '../../components/dashboard/inventory/AddProduct'

const Inventory = () => {
    const [activeModal, setActiveModal] = useState(false);
    const [activeModalTwo, setActiveModalTwo] = useState(false);

  return (
    <Layout>
        <div className="row">
            <h2>Inventory Management</h2>
            <div className="row-flex-left">
                <AddButton  value={"Add Categroy"} type={"btn-secondary"} onClick={()=>setActiveModal(true)} />
                <AddButton  value={"Add Product"} type={"btn-primary"} onClick={()=>setActiveModalTwo(true)}/>
            </div>
        </div>
        <div className="row">
            <input type="search" name="search" placeholder='Enter Seach term' id="" className="w-10" />

            <td className='drop'>
                <i className="bi bi-filter"></i>
                    <div className="drop-down">
                        <ul>
                            <Link>
                                <li>
                                   Category list
                                </li>
                            </Link>
                        </ul>
                    </div>
            </td>
        </div>
        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
            {activeModal== true? <AddCategory modal={true}  />:""}
        </div>
        <div className={activeModalTwo == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModalTwo(false)}></i>
            {activeModalTwo== true? <AddProduct modal={true}  />:""}
        </div>
        <div className="row">
            <AllInventory />
        </div>
    </Layout>
  )
}

export default Inventory
