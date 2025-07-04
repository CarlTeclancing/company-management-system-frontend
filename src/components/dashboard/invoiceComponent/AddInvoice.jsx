import React, { useContext, useEffect, useState } from 'react';
import InputField from '../../../components/auth/InputField';
import Button from '../../../components/common/button';
import logo from '../../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownField from '../../auth/DropDownField';
import { AppContext } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';

const AddInvoice = ( {modal}) => {
    const [modalValue, setModalValue] = useState(modal);

    //getting the company id from authcontext
      const {
        user,
        setUser,
        companyId,
        isLoggedIn,
        setIsLoggedIn
      } = useAuth();

      console.log('User:', user);
      // useEffect(() => {
      //   //console.log('Raw user:', user);
      
      //   // Check if it's a string
      //   if (typeof user === 'string') {
      //     const parsedUser = JSON.parse(user);
      //     console.log('Parsed Company ID:', parsedUser.company_id);
          
      //   } else {
      //     console.log('Company ID:', user?.company_id);
      //   }
      // }, [user]);


  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    country: '',
    address: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // optional
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const parsedUser = JSON.parse(user);
    // const companyId = parsedUser.company_id;

    const newErrors = {};

    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.number) newErrors.number = 'Number is required';
    if (!form.country) newErrors.country = 'Country is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.role) newErrors.role = 'Role is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { name, email, password, number, address, role } = form;

      try {
        setLoading(true);
        await axios.post('http://localhost:5000/v1/api/users/', {
          name,
          email,
          password,
          role,
          number,
          address,
          companyId,
        });
        setLoading(false);
              // Reset the form after successful submission
      setForm({
        name: '',
        email: '',
        password: '',
        number: '',
        country: '',
        address: '',
        role: '',
      });

      // clear errors too
      setErrors({});
        
        navigate('/users'); // ✅ correct redirect
      } catch (err) {
        setLoading(false);
        console.error('Error:', err.response?.data || err.message);
        console.error(err);
        console.log('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };

  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' },
  ];

 

  return (
    <>
      <form className='form-invoice' onSubmit={handleSubmit}>
        
        <h2>Create an invoice</h2>
        <p>Enter invoice information to create a new invoice</p>

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

        </div>

        <div className="form-el">
          <InputField
            label="Issue Date"
            name="issueDate"
            type="date"
            value={form.issueDate}
            onChange={handleChange}
            placeholder="Enter issue date"
            error={errors.issueDate}
          />
          <InputField
            label="Due Date"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            placeholder="Enter due date"
            error={errors.dueDate}
          />

        </div>
        <div className="action-100">
            <div className="row">
                <h2>Incoice items</h2>
                <Button value="Add Item" type={"btn-secondary"} />
            </div>
            <div className="form-el-100">
                <InputField
                    label="Description"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter invoice title"
                    error={errors.name}
                />
                <InputField
                    label="Quantity"
                    name="name"
                    type="number"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter invoice title"
                    error={errors.name}
                />
            </div>
            <div className="form-el-100">
                <InputField
                    label="Quantity"
                    name="name"
                    type="number"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="0"
                    error={errors.name}
                />
                <InputField
                    label="Rate"
                    name="name"
                    type="number"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="0"
                    error={errors.name}
                />
            </div>
        </div>

        <div className="form-el">
          <DropdownField
            label="Payment terms"
            name="paymentTerms"
            value={form.paymentTerms}
            onChange={handleChange}
            options={roles}
            error={errors.role}
          />

          <InputField
            label="Invoice Description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter invoice description"
            error={errors.description}
          />
        </div>

        
      <div className="row-flex-left">
        <Button value={loading ? 'Submitting...' : 'Create Invoice'} type={"btn-primary"}  />
      </div>
                                                                                                                                                                                                                                         
      </form>
    </>
  );
};

export default AddInvoice;
