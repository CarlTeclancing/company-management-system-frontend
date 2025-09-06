import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../auth/InputField';
import { BASE_URL } from '../../../../globals';
import axios from 'axios';

function AddProductQuantity() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { productsId, productsName, productDesc, productPrice, productQuantity } = state || {};


  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (quantity <= 0) newErrors.quantity = 'Quantity must be positive';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
        const qty = quantity;
        const id = productsId;
        console.log(qty + id)
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}/inventory/add-qty/`, {qty, id});
            setLoading(false);
            console.log("submited")
            
        } catch (error) {
            console.log("Error updating qunatity" . error)
        }
    }
  }

  return (
    <Layout title={"Edit product "}>
<div className="side-col">

    <div className="col">
    <h2>product info</h2>
    <p>Product Name: {productsName}</p>
    <p>Product Description: {productDesc}</p>
    <p>Product Price: {productPrice}</p>
    <p>Product Quantity: {productQuantity}</p>

    </div>
          <div className="form-el-100">
            <h3>Add Product Quantity</h3>
          </div>
          <form className="form-100" onSubmit={validateForm}>
            <div className="form-el-200">
              <InputField
                label="Item Quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                placeholder="Enter item quantity"
                error={errors.quantity}
              />
            </div>

            <div className="row-flex-left">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Quantity'}
              </button>
            </div>
          </form>
        </div>
    </Layout>
  )
}

export default AddProductQuantity