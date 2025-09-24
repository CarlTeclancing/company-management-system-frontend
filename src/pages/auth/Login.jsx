import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/auth/InputField';
import Button from '../../components/common/Button';
import logo from '../../assets/images/logo.svg';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import {     BASE_URL } from '../../../globals';


const Login = () => {
      const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024); // treat <1024px as mobile/tablet
      };
  
      handleResize(); // check on first load
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

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
          `${    BASE_URL}/auth/login`,
          {
            email: form.email,
            password: form.password,
          }
        );

        const { token, userData } = response.data;

        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(response.data);

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

    if (isMobile) {
    return (
      <div style={{ 
        display: "flex", 
        height: "100vh", 
        justifyContent: "center", 
        alignItems: "center", 
        textAlign: "center", 
        padding: "20px" 
      }}>
        <h2>Please use a desktop for the best experience</h2>
      </div>
    );
  }

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
        <Link className="btn-secondary-100" to="/onboarding">
          Don’t have an account?
        </Link>
      </form>
    </div>
  );
};

export default Login;
