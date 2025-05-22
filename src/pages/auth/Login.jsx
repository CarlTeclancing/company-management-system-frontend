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
    companyId,
    setCompanyId,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuth();

  // ✅ Hydrate auth context from localStorage on mount
  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // const token = localStorage.getItem('token');

    // if (storedUser && token) {
    //   try {
    //     const parsedUser = JSON.parse(storedUser);
    //     setUser(parsedUser);
    //     setIsLoggedIn(true);
    //   } catch (err) {
    //     console.error('Failed to parse user from localStorage:', err);
    //   }
    // }

    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [user, navigate] ); // run once on component mount

  // ✅ Redirect after successful login


  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/dashboard');
  //   }
  // }, [isLoggedIn, navigate]);

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
        const response = await axios.post(
          'http://localhost:5000/v1/api/auth/login',
          {
            email: form.email,
            password: form.password,
          }
        );

        const { token, userData } = response.data;

        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        // Update context
        setUser(userData);
        setCompanyId(userData.company_id);
        setIsLoggedIn(true);
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
          value={loading ? 'Signing in...' : 'Sign in'}
          type={'btn-primary-100'}
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
