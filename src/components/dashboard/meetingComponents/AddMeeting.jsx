import { useContext, useState } from 'react';
import InputField from '../../../components/auth/InputField';

import Button from '../../../components/common/button';
import logo from '../../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownField from '../../auth/DropDownField';
import { useAuth } from '../../../contexts/AuthContext';
import { BASE_URL } from '../../../../globals';
//import { AppContext } from '../../../contexts/AppContext';



const AddMeetings = ( {modal}) => {
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

        await axios.post(`${BASE_URL}/meetings`, {
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
        console.log('Meeting created successfully');

  
      } catch (err) {
        setLoading(false);
        console.error('Submission error:', err.response?.data?.message);
        //console.log('Registration failed: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };
  

  const MeetingData = [
    { label: 'Sprint', value: 'sprint' },
    { label: 'Checkings', value: 'checkings' },
    { label: 'Review', value: 'review' },
  ];
  const platformData = [
    { label: 'Goodle Meet', value: 'Goodle Meet' },
    { label: 'Zoom', value: 'Zoom' },
    { label: 'Microsoft Teams', value: 'Microsoft Teams' },
    { label: 'Skype', value: 'Skype' },
    { label: 'Others', value: 'Others' },
  ];

 

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Create New Meeting</h4>
        <p>Add a new meeting for your team. Click save when you're done.</p>
        

        <div className="form-el-200">
          <InputField
            label="Meeting Title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter meeting title"
            error={errors.title}
          />

          <InputField
            label="Meeting Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            error={errors.date}
          />
        </div>

        <div className="form-el">
          <InputField
            label="Start Time"
            name="startTime"
            type="time"
            value={form.startTime}
            onChange={handleChange}
            placeholder="Select start time"
            error={errors.startTime}
          />

        <InputField
            label="End Time"
            name="endTime"
            type="time"
            value={form.endTime}
            onChange={handleChange}
            placeholder="Select end time"
            error={errors.endTime}
          />
        </div>

        <div className="form-el">
          <DropdownField
            label="Meeting Type"
            name="meetingType"
            value={form.meetingType}
            onChange={handleChange}
            options={MeetingData}
            error={errors.meetingType}
          />
          <DropdownField
            label="Platform"
            name="platform"
            value={form.platform}
            onChange={handleChange}
            options={platformData}
            error={errors.platform}
          />

        </div>
        <div className="form-el-200">
        <InputField
            label="Meeting Link"
            name="meetingLink"
            type="link"
            value={form.meetingLink}
            onChange={handleChange}
            placeholder="Enter meeting link"
            error={errors.meetingLink}
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
