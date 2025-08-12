import React, { useContext, useEffect, useState } from 'react';
import InputField from '../../../components/auth/InputField';
import Button from '../../../components/common/button';
import logo from '../../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownField from '../../auth/DropDownField';
import { AppContext } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';
import DescriptionField from '../../auth/Description';

const AddProduct = ( {modal}) => {
    const [modalValue, setModalValue] = useState(modal);

    //getting the company id from authcontext
      const {
        user,
        setUser,
        companyId,
        isLoggedIn,
        setIsLoggedIn
      } = useAuth();

      console.log('User:', user);

  const [form, setForm] = useState({
    title: '',
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

    if (!form.title) newErrors.title = 'Title is required';
    if (!form.description) newErrors.description = 'Description is required';
  

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { title, description } = form;

      try {
        setLoading(true);
        await axios.post('http://localhost:5000/v1/api/users/', {
          title,
          description,
          user_id: parseInt(user?.id),
          companyId,
        });
        setLoading(false);
              // Reset the form after successful submission
      setForm({
        title: '',
        description: '',

      });

      // clear errors too
      setErrors({});
        
        navigate('/users'); // ✅ correct redirect
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
        
        <h2>Create a Product</h2>
        <p>Enter category information to create a new category</p>

        <div className="form-el-200">
          <InputField
            label="Category Name"
            name="tile"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter name"
            error={errors.titile}
          />

        </div>
        
      <div className="row-flex-left">
        <Button value={loading ? 'Submitting...' : 'Create Product'} type={"btn-primary"}  />
      </div>
                                                                                                                                                                                                                                         
      </form>
    </>
  );
};

export default AddProduct;
