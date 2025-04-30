import { useState } from 'react';
import InputField from '../../components/auth/InputField';
import './auth.css'
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and submission logic here
    const newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit the form
      console.log('Form submitted:', form);
    }
  }

  return (
    <div className="form-container">

        <form className='form' action='' onSubmit={handleSubmit}>
            <img src={logo} alt="logo" />
            <h2>Login</h2>
            <p>Enter your credentials to access your account</p>
            <div className="form-el-200">

                <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      error={errors.email}
                
                />

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

            

        {/* Submit button, etc. */}
        <hr />
        <Button value={"Sign in"} type={"btn-primary-100"} />
        <hr />

        <Link to={"/forgot-password"}>
            Forgot Password
        </Link>

        <Link className='btn-secondary-100' to={'/register'}>
            Do not have an account
        </Link>
        </form>
    </div>
  );
};

export default Login;
