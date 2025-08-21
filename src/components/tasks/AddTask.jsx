import { useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import InputField from '../auth/InputField';
import DropdownField from '../auth/DropDownField';
import Button from '../common/Button';
import { AppContext } from '../../contexts/AppContext';
import { BASE_URL } from '../../../globals';

const AddTask = ({ modal }) => {
  const [modalValue, setModalValue] = useState(modal);
  const { user, companyId } = useAuth();
  const { users } = useContext(AppContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    assignee: '', // ✅ used consistently now
    status: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.priority) newErrors.priority = 'Priority is required';
    if (!form.assignee) newErrors.assignee = 'Assignee is required';
    if (!form.status) newErrors.status = 'Status is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        await axios.post(`${BASE_URL}/tasks`, {
          title: form.title,
          description: form.description,
          priority: form.priority,
          assignee: form.assignee,
          status: form.status,
          date: form.date,
          user_id,
          company_id,
        });

        setLoading(false);
        setErrors({});
        console.log('Task created successfully');
        setForm({
          title: '',
          description: '',
          priority: '',
          assignee: '',
          status: '',
          date: '',
        });
      } catch (err) {
        setLoading(false);
        console.error('Submission error:', err.response?.data?.message);
      }
    }
  };

  const priorityData = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  const dropdownOptions = users.map((user) => ({
    label: user.full_name || user.name,
    value: user.id,
  }));

  const statusData = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h4>Create New Task</h4>
      <p>Add a new task for your team. Click save when you're done.</p>

      <div className="form-el-200">
        <InputField
          label="Task Title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
          error={errors.title}
        />
        <InputField
          label="Description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter task description"
          error={errors.description}
        />
      </div>

      <div className="form-el">
        <DropdownField
          label="Priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          options={priorityData}
          error={errors.priority}
        />
        <DropdownField
          label="Assignee"
          name="assignee" // ✅ fixed from platform → assignee
          value={form.assignee}
          onChange={handleChange}
          options={dropdownOptions}
          error={errors.assignee} // ✅ fixed from platform → assignee
        />
      </div>

      <div className="form-el">
        <InputField
          label="Dateline"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          placeholder="dd/mm/yyyy"
          error={errors.date}
        />
        <DropdownField
          label="Task Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={statusData}
          error={errors.status}
        />
      </div>

      <div className="row-flex-left">
        <Button
          value={loading ? 'Submitting...' : 'Create Task'}
          type="btn-primary"
        />
      </div>
    </form>
  );
};

export default AddTask;
