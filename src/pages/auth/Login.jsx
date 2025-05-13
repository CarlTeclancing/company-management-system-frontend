import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/auth/InputField';
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();

  // Hydrate auth context from localStorage if available
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  useEffect(() => {

    if (storedUser && token) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, [storedUser, token, setIsLoggedIn]);

  // Check if user has company linked already
  // useEffect(() => {

  //   if (user && user.company) {
  //     navigate('/dashboard');
  //   } else if (user && !user.company) {
  //     navigate('/onboarding');
  //   }
  // }, [setUser, setIsLoggedIn]);

  // Redirect after context is hydrated
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/v1/api/auth/login', {
          email: form.email,
          password: form.password,
        });

        const { token, userData } = response.data;
        console.log('Login response:', response.data);

        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        // Update context
        setUser(userData);
        console.log('User data:', userData);
        setIsLoggedIn(true);

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
      <form className="form" onSubmit={handleLogin}>
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
