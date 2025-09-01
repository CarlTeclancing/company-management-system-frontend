import React from 'react'
import Layout from '../../components/layout/Layout'
import InputField from '../../components/auth/InputField'
import "../dashboard/dashboard.css"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../globals'

function InvoiceDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = location
  const invoice = state?.invoice[0]; // pick the first one

  const [form, setForm] = React.useState({
    name: '',
    quantity: '',
    price: '',
  })

  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)

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
    console.log(invoice.id)

    try {
      setLoading(true)
      await axios.post(`${BASE_URL}/items`, {
        name: form.name,
        quantity: form.quantity,
        price: form.price,
        invoice_id: invoice?.id,
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

  return (
    <Layout>
      <div className="row">
        <h1>Invoice Details</h1>
      </div>
      <div className="row-flex-row">
        <div className="side-col">
          <div className="form-el-100">
            <h3>Invoice Details</h3>
            <i className="bi bi-download"></i>
          </div>
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
