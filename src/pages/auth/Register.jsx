import { useState } from 'react';
import InputField from '../../components/auth/InputField';
import './auth.css'
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

        {/* Submit button, etc. */}
        <Button value={"Sign in"} type={"btn-primary-100"} />

        <Link className='m-10' to={'/login'}>
            Already have an account
        </Link>
        </form>
    </div>
  );
};

export default Register;
