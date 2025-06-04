import { useContext, useState } from 'react';
import InputField from '../../../components/auth/InputField';

import Button from '../../../components/common/button';
import logo from '../../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownField from '../../auth/DropDownField';
import { useAuth } from '../../../contexts/AuthContext';
//import { AppContext } from '../../../contexts/AppContext';

const AddProjects = ( {modal}) => {
    const [modalValue, setModalValue] = useState(modal);
    //const [companyData, setCompanyDatea] = useContext(AppContext);

    const {    
      user,
      companyId,
    } = useAuth();
  const [form, setForm] = useState({
    name: '',
    description: '',
    sdate: '',
    edate: '',
    team: '',
    budget: '',
    
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // optional
  const navigate = useNavigate();
  //console.log(user?.id)
  //console.log(companyId)
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    const company_id = parseInt(companyId);
    const user_id = parseInt(user?.id);
  
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.sdate) newErrors.sdate = 'Start date is required';
    if (!form.edate) newErrors.edate = 'End date is required';
    if (!form.team) newErrors.team = 'Team is required';
    if (!form.budget) newErrors.budget = 'Budget is required';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      const {
        name,
        description,
        sdate,
        edate,
        team,
        budget,
      } = form;
  
      try {
        setLoading(true);
  
        await axios.post('http://localhost:5000/v1/api/projects/', {
          name,
          description,
          sdate,
          edate,
          team,
          budget,
          user_id,
          company_id,
        });
  
        // Reset the form
        setForm({
          name: '',
          description: '',
          sdate: '',
          edate: '',
          team: '',
          budget: '',
        });
        
        setLoading(false);
        setErrors({});
        console.log('Project created successfully');
        // Optionally, you can show a success message here
        // Redirect to the users page or any other page
        // If you want to close the modal after submission
        if (modalValue) {
          setModalValue(false);
        }
  
        // Add a slight delay before redirecting to ensure UI updates
        setTimeout(() => {
          navigate('/users');
        }, 100);
  
      } catch (err) {
        setLoading(false);
        console.error('Submission error:', err);
        console.log('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };
  

  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' },
  ];

 

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Create New Project</h4>
        <p>Add a new project to your tracker. Click save when you're done.</p>

        <div className="form-el">
          <InputField
            label="Project Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter project name"
            error={errors.name}
          />

          <InputField
            label="Description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter project description"
            error={errors.description}
          />
        </div>

        <div className="form-el">
          <InputField
            label="Start Date"
            name="sdate"
            type="date"
            value={form.sdate}
            onChange={handleChange}
            placeholder="Select start date"
            error={errors.sdate}
          />

        <InputField
            label="End Date"
            name="edate"
            type="date"
            value={form.edate}
            onChange={handleChange}
            placeholder="Select end date"
            error={errors.edate}
          />
        </div>

        <div className="form-el">
          <DropdownField
            label="Select your Team"
            name="team"
            value={form.team}
            onChange={handleChange}
            options={roles}
            error={errors.team}
          />

          <InputField
            label="Budget"
            name="budget"
            type="number"
            value={form.budget}
            onChange={handleChange}
            placeholder="Enter project budget"
            error={errors.budget}
          />
        </div>

        <Button value={loading ? 'Submitting...' : 'Create Project'} type={"btn-primary-100"} />

      </form>
    </>
  );
};

export default AddProjects;
