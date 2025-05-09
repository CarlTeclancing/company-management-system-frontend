import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/auth/InputField';
import './auth.css';
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        const { email, password } = form;
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });

        const { token, user } = response.data;

        // Save token and user info to localStorage or context
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ general: 'Invalid email or password' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>

        <div className="form-el-200">
          {errors.general && <p className="error-message">{errors.general}</p>}

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

        <hr />
        <Button
          value={loading ? "Signing in..." : "Sign in"}
          type={"btn-primary-100"}
          disabled={loading}
        />
        <hr />

        <Link to="/forgot-password">Forgot Password</Link>
        <Link className="btn-secondary-100" to="/register">
          Don’t have an account?
        </Link>
      </form>
    </div>
  );
};

export default Login;
