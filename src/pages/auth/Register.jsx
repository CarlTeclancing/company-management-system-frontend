import { useState } from 'react';
import InputField from '../../components/auth/InputField';
import './auth.css'
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';
import DropdownField from '../../components/auth/DropDownField';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' },
  ];


  return (
    <div className="form-container">

        <form className='form'>
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
                    label="Company Name"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    error={errors.company}
                />
            </div>

            <div className="form-el">
            <DropdownField
                label="Select Curency"
                name="curency"
                value={form.curency}
                onChange={handleChange}
                options={roles}
                error={!form.role ? 'Role is required' : ''}
            />

                <InputField
                    label="Number of Employees"
                    name="employees"
                    type="number"
                    value={form.employees}
                    onChange={handleChange}
                    placeholder="Enter number of employees"
                    error={errors.employees}
                />
            </div>
        <div className="form-el">
            <DropdownField
                label="Are You A company?"
                name="choice"
                value={form.choice}
                onChange={handleChange}
                options={roles}
                error={!form.role ? 'Role is required' : ''}
            />
            
        </div>

        {/* Submit button, etc. */}
        <Button value={"Sign Up"} type={"btn-primary-100"} />

        <Link className='m-10' to={'/login'}>
            Already have an account
        </Link>
        </form>
    </div>
  );
};

export default Register;
