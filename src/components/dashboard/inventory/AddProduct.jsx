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

const AddProduct = ( {modal}) => {
    const [modalValue, setModalValue] = useState(modal);
    const [categoryData, setCategoryData] = useState([]);

    //getting the company id from authcontext
      const {
        user,
        setUser,
        companyId,
        isLoggedIn,
        setIsLoggedIn
      } = useAuth();

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

    if (!form.name) newErrors.name = 'Name is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.price) newErrors.price = 'Price is required';
    if (!form.quantity) newErrors.quantity = 'Quantity is required';
    if (!form.category) newErrors.category = 'Category is required';

  

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { name, description, price, quantity, category } = form;

      try {
        setLoading(true);
        await axios.post(`${BASE_URL}/inventory`, {
          name,
          description,
          price,
          quantity,
          category,
          status:"In Stock",
          createdBy: parseInt(user?.id),
          company_id: companyId,
        });
        setLoading(false);
              // Reset the form after successful submission
      setForm({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',

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

   useEffect(() => { 
    if (companyId) {
      // Fetch invoice details using invoiceId
      const company_id = companyId;
      const fetchCompanyCategories = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/category/company/${company_id}`)
          setCategoryData(response.data);
          console.log('Category fetched successfully');

        } catch (error) {
          console.error('Error fetching category details:', error);
        }
      }

      fetchCompanyCategories();
    }
  }, [companyId])
 
const category = categoryData.map((cat) => ({
    label: cat.name,
    value: user.id,
  }));
  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        
        <h2>Create a Product </h2>
        <p>Enter Product information to create a new category</p>

        <div className="form-el-200">
          <InputField
            label="Product Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
            error={errors.name}
          />

        </div>
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
        <div className="form-el">
          <InputField
            label="Product Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Exp 10.00"
            error={errors.price}
          />
          <InputField
            label="Product Quantity"
            name="quantity"
            type="number"
            value={form.quantiy}
            onChange={handleChange}
            placeholder="Enter quantity"
            error={errors.quantiy}
          />
        </div>
        <div className="form-el-100">
          <DropdownField
            label="Select category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={category}
            error={errors.category}
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
