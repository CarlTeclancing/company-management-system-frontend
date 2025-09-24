import { useState } from 'react';
import InputField from '../../components/auth/InputField';
import './auth.css'
import Button from '../../components/common/Button';
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';

const ResetPassword = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

        <form className='form'>
            <img src={logo} alt="logo" />
            <h2>Login</h2>
            <p>Enter your credentials to access your account</p>
            
            <div className="form-el-100">
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

        {/* Submit button, etc. */}
        <hr />
        <Button value={"Send Reset Link"} type={"btn-primary-100"} />
        <hr />

        <Link className='m-10' to={"/login"}>
            Back to Login
        </Link>


        </form>
    </div>
  );
};

export default ResetPassword;
