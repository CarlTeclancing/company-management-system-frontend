import React from 'react'
import Layout from '../../components/layout/Layout'
import InputField from '../../components/auth/InputField'
import "../dashboard/dashboard.css"
import { useLocation } from 'react-router-dom';

function InvoiceDetails() {
    const location = useLocation();
    const { state: invoice } = location || {};
    const [form, setForm] = React.useState({
        name: '',
        quantity: '',
        price: '',

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };
    const [errors, setErrors] = React.useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Invoice title is required';
        if (!form.price) newErrors.price = 'Invoice price is required';
        if (!form.quantity) newErrors.quantity = 'Invoice quantity is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
    <Layout>
        <div className="row">
            <h1>Invoice Details</h1>
        </div>
        <div className="row-flex-row">
            <div className="side-col">
                <div className="form-el-100">
                    <h3>Invoice Details</h3>
                    <button className='btn-secondary'><i className="bi bi-download"></i>Download Invoice</button>
                </div>
            </div>
            <div className="side-col">
                <div className="form-el-100">
                    <h3>Add Invoice Item</h3>
                </div>
                <form className='form-100' onSubmit={validateForm}>
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
                        label="Invoice Amount"
                        name="amount"
                        type="number"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Enter invoice amount"
                        error={errors.amount}
                    />
                </div>
               
                <div className="row-flex-left">
                    <button type="submit" className="btn btn-primary">Add Item</button>
                </div>
            </form>

        </div>
        </div>
    </Layout>
  )
}

export default InvoiceDetails