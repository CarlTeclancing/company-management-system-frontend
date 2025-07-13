import React, { useEffect, useState } from 'react';
import InputField from '../../components/auth/InputField';
import Button from '../../components/common/button';
import DropdownField from '../../components/auth/DropDownField';
import Layout from '../../components/layout/Layout';
import Tabs from '../../components/layout/Tabs';
import { USERS } from '../../../globals';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const EditUser = ({ modal }) => {
  const [modalValue] = useState(modal);
  const location = useLocation();
  const { state: u } = location || {};
  const userId = u.id;

  const { user, companyId } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);

  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    country: '',
    address: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' },
  ];

  useEffect(() => {
    if (u) {
      setForm((prev) => ({
        ...prev,
        name: u.full_name || '',
        email: u.email || '',
        number: u.phone || '',
        country: u.country || '',
        address: u.address || '',
        role: u.role || '',
      }));
    }
  }, [u]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = (isPasswordUpdate = false) => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.number) newErrors.number = 'Number is required';
    if (!form.country) newErrors.country = 'Country is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.role) newErrors.role = 'Role is required';

    if (isPasswordUpdate) {
      if (!form.password) newErrors.password = 'Password is required';
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.put(`${USERS}/${userId}`, {
        name: form.name,
        email: form.email,
        number: form.number,
        address: form.address,
        role: form.role,
        country: form.country,
        companyId,
        userId
      });


      setLoading(false);

      setErrors({});
      navigate('/users');
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    try {
      setLoading(true);
      // Assume there's a separate password update endpoint
      await axios.put(`${USERS}/update-password`, {
        email: form.email,
        password: form.password,
      });

      setLoading(false);
      setForm({ ...form, password: '', confirmPassword: '' });
      setErrors({});
      alert('Password updated successfully!');
    } catch (err) {
      setLoading(false);
      console.error('Password update failed:', err);
    }
  };

  const tabData = [
    { tabNumb: 1, tabValue: "Edit User Data", onClick: () => setActiveTab(1) },
    { tabNumb: 2, tabValue: "Update Password", onClick: () => setActiveTab(2) },
  ];

  return (
    <Layout>
      <h1>Edit User Information</h1>
      <hr />
          <div className='global-tab'>
      {tabData.map((data) => (
        <button
          key={data.tabNumb}
          className={activeTab === data.tabNumb ? 'active-tab' : 'in-active-tab'}
          onClick={() => setActiveTab(data.tabNumb)}
        >
          {data.tabValue}
        </button>
      ))}
    </div>

      <div className="row-narrow">
        {/* Edit User Info Form */}
        {activeTab === 1 && (
          <form className="form m-10" onSubmit={handleSubmitUserInfo}>
            <h2>Edit User Information</h2>
            <p>Enter user information to update account</p>

            <div className="form-el">
              <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
              <InputField label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
            </div>

            <div className="form-el-100">
              <InputField label="Phone Number" name="number" value={form.number} onChange={handleChange} error={errors.number} />
            </div>

            <div className="form-el">
              <DropdownField label="Select your role" name="role" value={form.role} onChange={handleChange} options={roles} error={errors.role} />
              <InputField label="Country" name="country" value={form.country} onChange={handleChange} error={errors.country} />
            </div>

            <div className="form-el-100">
              <InputField label="Address" name="address" value={form.address} onChange={handleChange} error={errors.address} />
            </div>

            <div className="row-flex-left">
              <Button value={loading ? 'Submitting...' : 'Update User Info'} type="btn-primary-100" />
            </div>
          </form>
        )}

        {/* Update Password Form */}
        {activeTab === 2 && (
          <form className="form m-10" onSubmit={handlePasswordUpdate}>
            <h2>Update User Password</h2>
            <p>Enter new password to update it</p>

            <div className="form-el-100">
              <InputField label="New Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
            </div>

            <div className="form-el-100">
              <InputField label="Confirm New Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
            </div>

            <div className="row-flex-left">
              <Button value={loading ? 'Submitting...' : 'Update Password'} type="btn-primary-100" />
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default EditUser;
