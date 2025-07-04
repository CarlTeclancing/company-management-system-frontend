import { useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import InputField from '../auth/InputField';
import DropdownField from '../auth/DropDownField';
import Button from '../common/button';
//import { AppContext } from '../../../contexts/AppContext';

const AddTask = ( {modal}) => {
    const [modalValue, setModalValue] = useState(modal);
    //const [companyData, setCompanyDatea] = useContext(AppContext);

    const {    
      user,
      companyId,
    } = useAuth();
  const [form, setForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    meetingType: '',
    platform: '',
    meetingLink: '',
    
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
  
    if (!form.title) newErrors.title = 'Title is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.startTime) newErrors.startTime = 'Start Time is required';
    if (!form.endTime) newErrors.endTime = 'End Time is required';
    if (!form.meetingType) newErrors.meetingType = 'Meeting Type is required';
    if (!form.platform) newErrors.platform = 'platform is required';
    if (!form.meetingLink) newErrors.meetingLink = 'Meeting Link is required';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      const {
        title,
        date,
        startTime,
        endTime,
        meetingType,
        platform,
        meetingLink,
      } = form;
  
      try {
        setLoading(true);
  
        await axios.post('http://localhost:5000/v1/api/projects/', {
          title,
          date,
          startTime,
          endTime,
          meetingType,
          platform,
          meetingLink,
          user_id,
          company_id,
        });
        setLoading(false);
        // Reset the form
        setForm({
          title: '',
          date: '',
          startTime: '',
          endTime: '',
          meetingType: '',
          platform: '',
          meetingLink: '',
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
        <h4>Create New Task</h4>
        <p>Add a new task for your team. Click save when you're done.</p>
        

        <div className="form-el-200">
          <InputField
            label="Task Title"
            name="tilte"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title"
            error={errors.title}
          />
          <InputField
            label="Description"
            name="tilte"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task description"
            error={errors.title}
          />

        </div>

        <div className="form-el">
          <DropdownField
            label="Priority"
            name="meetingType"
            value={form.meetingType}
            onChange={handleChange}
            options={roles}
            error={errors.meetingType}
          />
          <DropdownField
            label="Assignee"
            name="platform"
            value={form.platform}
            onChange={handleChange}
            options={roles}
            error={errors.platform}
          />

        </div>
        <div className="form-el-200">
          <InputField
            label="Dateline"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            error={errors.date}
          />
        </div>


    <div className="row-flex-left">
        <Button value={loading ? 'Submitting...' : 'Create Task'} type={"btn-primary"} />

    </div>

      </form>
    </>
  );
};

export default AddTask;
