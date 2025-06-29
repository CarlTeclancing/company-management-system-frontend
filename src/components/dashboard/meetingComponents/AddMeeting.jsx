import { useContext, useState } from 'react';
import InputField from '../../../components/auth/InputField';

import Button from '../../../components/common/button';
import logo from '../../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownField from '../../auth/DropDownField';
import { useAuth } from '../../../contexts/AuthContext';
//import { AppContext } from '../../../contexts/AppContext';

const AddMeetings = ( {modal}) => {
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
        setLoading(false);
        // Reset the form
        setForm({
          name: '',
          description: '',
          sdate: '',
          edate: '',
          team: '',
          budget: '',
        });
        // Reset errors
        setErrors({});
        console.log('Project created successfully');

  
      } catch (err) {
        setLoading(false);
        console.error('Submission error:', err.response?.data?.message);
        //console.log('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
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
        <h4>Create New Meeting</h4>
        <p>Add a new meeting for your team. Click save when you're done.</p>
        

        <div className="form-el-200">
          <InputField
            label="Meeting Title"
            name="mtilte"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter meeting title"
            error={errors.name}
          />

          <InputField
            label="Meeting Date"
            name="mdate"
            type="date"
            value={form.description}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            error={errors.description}
          />
        </div>

        <div className="form-el">
          <InputField
            label="Start Time"
            name="sdate"
            type="time"
            value={form.sdate}
            onChange={handleChange}
            placeholder="Select start date"
            error={errors.sdate}
          />

        <InputField
            label="End Time"
            name="edate"
            type="time"
            value={form.edate}
            onChange={handleChange}
            placeholder="Select end date"
            error={errors.edate}
          />
        </div>

        <div className="form-el">
          <DropdownField
            label="Meeting Type"
            name="team"
            value={form.team}
            onChange={handleChange}
            options={roles}
            error={errors.team}
          />
          <DropdownField
            label="Platform"
            name="team"
            value={form.team}
            onChange={handleChange}
            options={roles}
            error={errors.team}
          />

        </div>
        <div className="form-el-200">
        <InputField
            label="Meeting Link"
            name="budget"
            type="link"
            value={form.budget}
            onChange={handleChange}
            placeholder="Enter meeting link"
            error={errors.budget}
          />
        </div>


    <div className="row-flex-left">
        <Button value={loading ? 'Submitting...' : 'Create Project'} type={"btn-primary"} />

    </div>

      </form>
    </>
  );
};

export default AddMeetings;
