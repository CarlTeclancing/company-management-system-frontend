import { useState } from 'react';
import InputField from '../../components/auth/InputField';
import './auth.css';
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import DropdownField from '../../components/auth/DropDownField';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    country: '',
    address: '',
    role: '', // added role to track dropdown value
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
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
      const { name, email, password, number, country, address, role } = form;

      axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password,
        number,
        country,
        address,
        role,
      })
        .then(res => {
          console.log(res);
          navigate('/onboarding');
        })
        .catch(err => {
          console.error(err);
        });
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

        <Button value={"Sign Up"} type={"btn-primary-100"} />

        <Link className='m-10' to='/login'>
          Already have an account?
        </Link>
        <Link className='m-10' to='/onboarding'>
          Company information
        </Link>
      </form>
    </div>
  );
};

export default Register;
