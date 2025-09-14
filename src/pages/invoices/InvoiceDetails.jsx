import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import InputField from '../../components/auth/InputField'
import "../dashboard/dashboard.css"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../globals'

//adding react-to-pdf
//import { usePDF } from "react-to-pdf";

function InvoiceDetails() {
  const [invoices, setInvoices] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { invoiceId, invoiceTitle, invoiceDescription, invoiceDate } = state || {};

  //react-to-pdf dowload hook
  //   const { toPDF, targetRef } = usePDF({
  //   filename: "simple-receipt.pdf",
  // });
 
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    price: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const validateForm = async (e) => {
    e.preventDefault() // ✅ stop page refresh

    const newErrors = {}
    if (!form.name) newErrors.name = 'Invoice title is required'
    if (!form.price) newErrors.price = 'Invoice price is required'
    if (!form.quantity) newErrors.quantity = 'Invoice quantity is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    console.log(invoiceId) 

    try {
      setLoading(true)
      await axios.post(`${BASE_URL}/items`, {
        name: form.name,
        quantity: form.quantity,
        price: form.price,
        invoice_id: invoiceId,
      })
      setLoading(false)

      // Reset the form after successful submission
      setForm({
        name: '',
        price: '',
        quantity: '',
      })

      setErrors({})

      // ✅ redirect after success
      navigate('/invoices')
    } catch (err) {
      setLoading(false)
      console.error('Error:', err.response?.data || err.message)
      console.log(
        'Item creation failed: ' +
          (err.response?.data?.message || 'Unknown error')
      )
    }
  }

  useEffect(() => { 
    if (invoiceId) {
      // Fetch invoice details using invoiceId
      const invoice_id = invoiceId;
      const fetchInvoiceDetails = async () => {
        try {
          const response1 = await axios.get(`${BASE_URL}/invoices/${invoice_id}`)
          const response2 = await axios.get(`${BASE_URL}/items/invoice/${invoice_id}`)
          setInvoices([response1.data]);
          setItemsData(response2.data);
          console.log('Invoice details fetched successfully');

        } catch (error) {
          console.error('Error fetching invoice details:', error);
        }
      }

      fetchInvoiceDetails();
    }
  }, [invoiceId])

  return (
    <Layout>
      <div className="row">
        <h1>Invoice Details</h1>
      </div>
      <div className="row-flex-row">
        <div className="side-col">
          <div className="form-el-100">
            <h3>Invoice Details</h3>
            <button><i className="bi bi-download"></i></button>
            
          </div>
          <div className="row">
                {invoices.map((invoice) => (
                  <div key={invoice.id}>
                    <p><strong>Invoice ID:</strong> {invoiceId}</p>
                    <p><strong>Customer Name:</strong> {invoiceTitle}</p>
                    <p><strong>Invoice Date:</strong> {invoiceDate}</p>
                    <p><strong>Invice Description:</strong> {invoiceDescription}</p>
                  </div>
                ))}
          </div>
          <hr />
          <h3>Invoice Items</h3>
          <div className="row-flex">
            {itemsData.map((item) => (
              <div key={item.id}>
                <div className="form-el-100">

                <i class='bi bi-pen'></i>
                <i class='bi bi-trash'></i>
                </div>
                <p><strong>Item Name:</strong> {item.name}</p>
                <p><strong>Item Quantity:</strong> {item.quantity}</p>
                <p><strong>Item Price:</strong> {item.price}</p>
                <hr />
              </div>

            ))}
          </div>
          <h3>
            Total 
            <strong>
              {": " + itemsData.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </strong>
        </h3>
        </div>
        <div className="side-col">
          <div className="form-el-100">
            <h3>Add Invoice Item</h3>
          </div>
          <form className="form-100" onSubmit={validateForm}>
            <div className="form-el-200">
              <InputField
                label="Item Name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter item name"
                error={errors.name}
              />
              <InputField
                label="Item Quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter item quantity"
                error={errors.quantity}
              />
              <InputField
                label="Invoice Price"
                name="price" // ✅ corrected
                type="number"
                value={form.price} // ✅ corrected
                onChange={handleChange}
                placeholder="Enter invoice price"
                error={errors.price} // ✅ corrected
              />
            </div>

            <div className="row-flex-left">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default InvoiceDetails
