import { useState } from 'react';
import InputField from '../../components/auth/InputField';
import './auth.css'
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">

        <form className='form'>
            <img src={logo} alt="logo" />
            <h2>Login</h2>
            <p>Enter your credentials to access your account</p>
            

                <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      error={errors.email}
                
                />     

        {/* Submit button, etc. */}
        <hr />
        <Button value={"Send Reset Link"} type={"btn-primary-100"} />
        <hr />

        <Link className='m-10' to={"/forgot-password"}>
            Back to Login
        </Link>


        </form>
    </div>
  );
};

export default ResetPassword;
