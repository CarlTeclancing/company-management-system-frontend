import { useState } from 'react';
import InputField from '../../components/auth/InputField';
import './auth.css'
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';
import DropdownField from '../../components/auth/DropDownField';

const Onboarding = () => {
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
            <h2>Company Information</h2>
            <p>Enter your information to create a company account</p>

            <div className="form-el">


                <InputField
                    label="Company Name"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    error={errors.company}
                />

                <DropdownField
                    label="Are You A company?"
                    name="choice"
                    value={form.choice}
                    onChange={handleChange}
                    options={roles}
                    error={!form.role ? 'Role is required' : ''}
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

            
        </div>

        {/* Submit button, etc. */}
        <Button value={"Complete Profile"} type={"btn-primary-100"} />
            <hr />

        </form>
    </div>
  );
};

export default Onboarding;
