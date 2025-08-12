import React from 'react'
import Layout from '../../components/layout/Layout'
import InputField from '../../components/auth/InputField'

function InvoiceDetails() {
    const [form, setForm] = React.useState({
        name: '',
        clientName: '',
        amount: '',
        date: '',
        dueDate: ''
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
        if (!form.clientName) newErrors.clientName = 'Client name is required';
        if (!form.amount) newErrors.amount = 'Invoice amount is required';
        if (!form.date) newErrors.date = 'Invoice date is required';
        if (!form.dueDate) newErrors.dueDate = 'Due date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
    <Layout>
        <div className="row">
            <h1>Invoice Details</h1>
        </div>
        <div className="col">
            <div className="form-el-100">
                <p>Invoice details will be displayed here.</p>
            </div>
            <form className='form-100'>
                <h3>Invoice Information</h3>
                <div className="form-el-200">
                    <InputField
                        label="Invoice Title"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter invoice title"
                        error={errors.name}
                    />
                    <InputField
                        label="Client Name"
                        name="clientName"
                        type="text"
                        value={form.clientName}
                        onChange={handleChange}
                        placeholder="Enter client name"
                        error={errors.clientName}
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
                <div className="form-el-200">
                    <InputField
                        label="Invoice Date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        placeholder="dd/mm/yyyy"
                        error={errors.date}
                    />
                    <InputField
                        label="Due Date"
                        name="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={handleChange}
                        placeholder="dd/mm/yyyy"
                        error={errors.dueDate}
                    />
                </div>
                <div className="row-flex-left">
                    <button type="submit" className="btn btn-primary">Save Invoice and Download pdf</button>
                </div>
            </form>

        </div>
    </Layout>
  )
}

export default InvoiceDetails