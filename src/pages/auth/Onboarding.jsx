import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/auth/InputField';
import DropdownField from '../../components/auth/DropDownField';
import Button from '../../components/common/button';
import logo from '../../assets/images/logo.svg';
import './auth.css';
import axios from 'axios';

const Onboarding = () => {
  const [form, setForm] = useState({ company: '', type: '', userCurrency: '', numEmployee: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // optional
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.company) newErrors.company = 'Company is required';
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.userCurrency) newErrors.userCurrency = 'Currency is required';
    if (!form.numEmployee) newErrors.numEmployee = 'Employee count is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit logic here (e.g., save to API or context)
      const { company, type, userCurrency, numEmployee } = form;

      try {
        setLoading(true);
        await axios.post('http://localhost:5000/v1/api/company', {
          company,
          type, 
          userCurrency, 
          numEmployee
        });
        setLoading(false);
        navigate('/onboarding'); // ✅ correct redirect
      } catch (err) {
        setLoading(false);
        console.error(err);
        console.log('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
      }

    }
  };

  const currency = [
    { label: 'CFA', value: 'XAF' },
    { label: '$ Dollar', value: '$' },
    { label: 'Euro', value: 'E' },
  ];

  const roles = [
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
            options={roles}
            error={errors.type}
          />
        </div>

        <div className="form-el">
          <DropdownField
            label="Select Currency"
            name="userCurrency"
            value={form.userCurrency}
            onChange={handleChange}
            options={currency}
            error={errors.userCurrency}
          />

          <InputField
            label="Number of Employees"
            name="numEmployee"
            type="number"
            value={form.numEmployee}
            onChange={handleChange}
            placeholder="Enter number of employees"
            error={errors.numEmployee}
          />
        </div>

        <Button value={"Complete Profile"} type={"btn-primary-100"} />
        <hr />
      </form>
    </div>
  );
};

export default Onboarding;
