import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/auth/InputField';
import DropdownField from '../../components/auth/DropDownField';
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg';
import './auth.css';
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext';

const Onboarding = () => {

  const {companyData, setCompanyData} = React.useContext(AppContext);

  const [form, setForm] = useState({
    company: '',
    type: '',
    currency: '',
    employeeCount: '',
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.company) newErrors.company = 'Company is required';
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.currency) newErrors.currency = 'Currency is required';
    if (!form.employeeCount) newErrors.employeeCount = 'Employee count is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/v1/api/company', form);
        //console.log('Company created:', response.data);

        // Save to localStorage
        //localStorage.setItem('company', JSON.stringify(response.data));

        // Update context
        setCompanyData(response.data);


        // Redirect to dashboard
        navigate('/register');
      } catch (err) {
        console.error(err);
        setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const currencyOptions = [
    { label: 'CFA', value: 'XAF' },
    { label: '$ Dollar', value: '$' },
    { label: 'Euro', value: 'E' },
  ];

  const typeOptions = [
    { label: 'Yes, I am a company', value: 'company' },
    { label: 'I am not a company', value: 'user' },
    { label: 'Guest', value: 'guest' },
  ];

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <h2>Company Information</h2>
        <p>Enter your information to create a company account</p>

        {apiError && <p className="error-message">{apiError}</p>}

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
            label="Are You A Company?"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={typeOptions}
            error={errors.type}
          />
        </div>

        <div className="form-el">
          <DropdownField
            label="Select Currency"
            name="currency"
            value={form.currency}
            onChange={handleChange}
            options={currencyOptions}
            error={errors.currency}
          />

          <InputField
            label="Number of Employees"
            name="employeeCount"
            type="number"
            value={form.employeeCount}
            onChange={handleChange}
            placeholder="Enter number of employees"
            error={errors.employeeCount}
          />
        </div>

        <Button
          value={loading ? 'Submitting...' : 'Complete Profile'}
          type="btn-primary-100"
          disabled={loading}
        />
        <hr />
      </form>
    </div>
  );
};

export default Onboarding;
