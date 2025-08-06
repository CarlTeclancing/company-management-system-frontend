import React, { useContext, useEffect, useState } from 'react';
import InputField from '../../components/auth/InputField';
import Button from '../../components/common/button'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

//GET CLIENT API RUL
import { CLIENTS } from '../../../globals';
import Layout from '../../components/layout/Layout';

const EditClient = ( {modal}) => {
    const [modalValue, setModalValue] = useState(modal);
    const location = useLocation();
    const { state: client } = location || {};
    const userId = client.id;

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
    email: '',
    number: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // optional
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

    useEffect(() => {
      if (client) {
        setForm((prev) => ({
          ...prev,
          name: client.name || '',
          email: client.email || '',
          number: client.number || '',
          address: client.address || '',
        }));
      }
    }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const parsedUser = JSON.parse(user);
    // const companyId = parsedUser.company_id;

    const newErrors = {};

    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.number) newErrors.number = 'Number is required';
    if (!form.address) newErrors.address = 'Address is required';


    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { name, email, number, address } = form;

      try {
        setLoading(true);
        await axios.put(`${CLIENTS}/${userId}`, {
          name,
          email,
          number,
          address,
          companyId,
        });
        setLoading(false);
              // Reset the form after successful submission
      setForm({
        name: '',
        email: '',
        number: '',
        address: '',
      });

      // clear errors too
      setErrors({});
        
        navigate('/clients'); // ✅ correct redirect
      } catch (err) {
        setLoading(false);
        console.error('Error:', err.response?.data || err.message);
        console.error(err);
        console.log('failed to create client: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };

 

  return (
    <>
        <Layout>
            <form className='form' onSubmit={handleSubmit}>
        
            <h2>Add New Client</h2>
            <p>Add a new client to your system. Fill in the client details below.</p>

            <div className="form-el-200">
            <InputField
                label="Client Name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                error={errors.name}
            />

            <InputField
                label="Client Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
            />
            </div>

            <div className="form-el">
            <InputField
                label="Address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                error={errors.address}
            />

            <InputField
                label="Phone Number"
                name="number"
                type="text"
                value={form.number}
                onChange={handleChange}
                placeholder="Enter your number"
                error={errors.number}
            />
            </div>

        <div className="row-flex-left">
            
            <Button value={loading ? 'Submitting...' : 'Add Client'} type={"btn-primary"}  />
        </div>
            

        </form>
        </Layout>
    </>
  );
};

export default EditClient;
