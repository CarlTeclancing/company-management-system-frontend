import React, { useContext, useEffect, useState } from 'react';
import InputField from '../../../components/auth/InputField';
import Button from '../../../components/common/Button';
import logo from '../../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownField from '../../auth/DropDownField';
import { AppContext } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';
import DescriptionField from '../../auth/Description';
import { BASE_URL } from '../../../../globals';

const AddCategory = ( {modal}) => {
    const [modalValue, setModalValue] = useState(modal);

    //getting the company id from authcontext
      const {
        user,
        setUser,
        companyId,
        isLoggedIn,
        setIsLoggedIn
      } = useAuth();

  const [form, setForm] = useState({
    name: '',
    description: '',

  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // optional
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const parsedUser = JSON.parse(user);
    // const companyId = parsedUser.company_id;

    const newErrors = {};

    if (!form.name) newErrors.name = 'Name is required';
    if (!form.description) newErrors.description = 'Description is required';
  

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { name, description } = form;

      try {
        setLoading(true);
        await axios.post(`${BASE_URL}/category`, {
          name,
          description, 
          company_id: companyId,
        });
        setLoading(false);
              // Reset the form after successful submission
      setForm({
        name: '',
        description: '',

      });

      // clear errors too
      setErrors({});
        
        navigate('/inventory'); // ✅ correct redirect
      } catch (err) {
        setLoading(false);
        console.error('Error:', err.response?.data || err.message);
        console.error(err);
        console.log('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };
 

 

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        
        <h2>Create an category</h2>
        <p>Enter category information to create a new category</p>

        <div className="form-el-200">
          <InputField
            label="Category Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
            error={errors.name}
          />
        <div className="form-el-100">
          <DescriptionField
            label="Category Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            error={errors.description}
          />
      </div>
            

        </div>
        
      <div className="row-flex-left">
        <Button value={loading ? 'Submitting...' : 'Create Category'} type={"btn-primary"}  />
      </div>
                                                                                                                                                                                                                                         
      </form>
    </>
  );
};

export default AddCategory;
