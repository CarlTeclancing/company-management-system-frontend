import React, { useContext, useEffect, useState } from 'react';
import InputField from '../../../components/auth/InputField';
import Button from '../../../components/common/button';
import logo from '../../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownField from '../../auth/DropDownField';
import { AppContext } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';

//user end point 
import { USERS } from '../../../../globals';

const AddUser = ( {modal}) => {
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
        await axios.post(`${USERS}`, {
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
      <form className='form' onSubmit={handleSubmit}>
        
        <h2>Create an a User Account</h2>
        <p>Enter user information to create a account</p>

        <div className="form-el-200">
          <InputField
            label="Full Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            error={errors.name}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />
        </div>

        <div className="form-el-200">
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />

        </div>

        <div className="form-el">
          <DropdownField
            label="Select your role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={roles}
            error={errors.role}
          />

          <InputField
            label="Country"
            name="country"
            type="text"
            value={form.country}
            onChange={handleChange}
            placeholder="Enter your country"
            error={errors.country}
          />
        </div>

        <div className="form-el">
        <InputField
            label="Phone Number"
            name="number"
            type="text"
            value={form.number}
            onChange={handleChange}
            placeholder="Enter your number"
            error={errors.number}
          />
          <InputField
            label="Address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your address"
            error={errors.address}
          />
        </div>
      <div className="row-flex-left">
        <Button value={loading ? 'Submitting...' : 'Add User'} type={"btn-primary"}  />
      </div>
        

      </form>
    </>
  );
};

export default AddUser;
