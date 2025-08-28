import React, { useEffect, useState } from 'react';
import InputField from '../../../components/auth/InputField';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownField from '../../auth/DropDownField';
import { useAuth } from '../../../contexts/AuthContext';
import DescriptionField from '../../auth/Description';
import { BASE_URL } from '../../../../globals';

const AddInvoice = ({ modal }) => {
  const [modalValue, setModalValue] = useState(modal);

  // getting the company id from authcontext
  const { user, companyId } = useAuth();

  console.log('User:', user);

  const [form, setForm] = useState({
    title: '',
    description: '',
    client: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.title) newErrors.title = 'Title is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.client) newErrors.client = 'Client is required';
    if (!form.date) newErrors.date = 'Date is required';

    setErrors(newErrors);
    console.table(form)
    if (Object.keys(newErrors).length === 0) {
      const { title, description, client, date } = form;

      try {
        
        setLoading(true);
        await axios.post(`${BASE_URL}/invoices`, {
          title,
          description,
          client_id: client,
          date,
          user_id: user?.id,
          company_id: companyId,
        });

        setLoading(false);

        // Reset the form after successful submission
        setForm({
          title: '',
          description: '',
          client: '',
          date: '',
        });

        // clear errors too
        setErrors({});

        // ✅ redirect after success
        navigate('/invoices');
      } catch (err) {
        setLoading(false);
        console.error('Error:', err.response?.data || err.message);
        console.log(
          'Invoice creation failed: ' +
            (err.response?.data?.message || 'Unknown error')
        );
      }
    }
  };


  //fetch clients for the dropdown
  const [clientsData, setClientsData] = useState([]);
const fetchClients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/clients/company/${companyId}`);
    const clientsData = response.data.map(client => ({
      value: client.id,
      label: client.name,
    }));
    setClientsData(clientsData);
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
};
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create an invoice</h2>
        <p>Enter invoice information to create a new invoice</p>

        <div className="form-el-200">
          <InputField
            label="Invoice Title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter invoice title"
            error={errors.title}
          />
        </div>

        <div className="form-el-100">
          <DescriptionField
            label="Invoice Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            error={errors.description}
          />
        </div>

        <div className="form-el">
          <DropdownField
            label="Select Client"
            name="client"
            value={form.client}
            onChange={handleChange}
            options={clientsData}
            error={errors.client}
          />
          <InputField
            label="Invoice Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            placeholder="Enter invoice date"
            error={errors.date}
          />
        </div>

        <div className="row-flex-left">
          <Button
            value={loading ? 'Submitting...' : 'Create Invoice'}
            type={'btn-primary'}
          />
        </div>
      </form>
    </>
  );
};

export default AddInvoice;
