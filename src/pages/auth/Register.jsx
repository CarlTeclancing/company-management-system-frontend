import React, { useState, useEffect } from 'react';
import InputField from '../../components/auth/InputField';
import './auth.css';
import Button from '../../components/common/Button';
import logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import DropdownField from '../../components/auth/DropDownField';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { AppContext } from '../../contexts/AppContext';


//importing the endpoint url

import { BASE_URL } from '../../../globals';


const Register = () => {
  
  //GET compay id from context
  const {companyData} = React.useContext(AppContext);
  const companyId = companyData?.id;
  console.log('Company ID:', companyId);


  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    country: '',
    address: '',
    role: '',
  });


  //logs the company data
  useEffect(() => {
    console.log('Company data updated:', companyData);
  }, [companyData]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // optional
  const navigate = useNavigate();
    const {
      user,
      setUser,
      isLoggedIn,
      setIsLoggedIn
    } = useAuth();
  
    if(isLoggedIn === true) {
      navigate('/dashboard');
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        await axios.post(`${BASE_URL}/auth/register`, {
          name,
          email,
          password,
          role,
          number,
          address,
          companyId: companyId,
        });
        setLoading(false);
        navigate('/login'); // redirect
      } catch (err) {
        setLoading(false);
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
    <div className="form-container">
      <form className='form' onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <h2>Create an Account</h2>
        <p>Enter your information to create a company account</p>

        <div className="form-el">
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

        <div className="form-el">
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />

          <InputField
            label="Phone Number"
            name="number"
            type="text"
            value={form.number}
            onChange={handleChange}
            placeholder="Enter your number"
            error={errors.number}
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
            label="Address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your address"
            error={errors.address}
          />
        </div>
<hr /><hr /><hr />
        <Button value={loading ? 'Submitting...' : 'Sign Up'} type={"btn-primary-100"} />
<hr /><hr />
        <Link className='m-10 btn-secondary-100' to='/login'>
          Already have an account?
        </Link>

      </form>
    </div>
  );
};

export default Register;
