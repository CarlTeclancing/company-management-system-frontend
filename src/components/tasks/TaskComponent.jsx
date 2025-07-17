import React, { useState, useEffect } from 'react';
import check from '../../assets/icons/check.png';
import pending from '../../assets/icons/notchecked.png';
import inprogress from '../../assets/icons/progress.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TASKS } from '../../../globals';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function TaskComponent({ status }) {
  const { companyId } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState('');

  useEffect(() => {
    const id = companyId;
    const getTaskById = async (id) => {
      try {
        const response = await axios.get(`${TASKS}/${id}`);
        setTasks(response.data);
        console.log('Fetched Task:', response.data);
      } catch (error) {
        console.error('Error fetching Task:', error);
        setErrorFetching(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getTaskById(id);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return pending;
      case 'in_progress':
        return inprogress;
      case 'completed':
      default:
        return check;
    }
  };

  // if (errorFetching) return <p>Error fetching tasks: {errorFetching}</p>;
  // if (isLoading) return <p>Loading tasks...</p>;

  return (
    <>
      {tasks.map((u) => (
        <div className="recent-task" key={u.id}>
          <div className="active-task">
            <div className="row-narrow-p0">
              <div className="row-narrow">
                <img src={getStatusIcon(u.status)} alt={u.status} />
                <h4>{u.title}</h4>
              </div>
              <p>{u.assignee} completed the inventory audit task</p>
              <br />
              <div className="m-1">
                <button className="action">Priority: {u.priority}</button>
                <span>
                  <i className="bi bi-calendar4-event"></i> Due: {u.date}
                </span>
                <span>
                  <i className="bi bi-chat-left-dots"></i>: {u.comments} Comments
                </span>
              </div>
            </div>

            <div className="drop">
              <i className="bi bi-three-dots"></i>
              <div className="drop-down">
                <ul>
                  <Link to={`/tasks/edit/${u.id}`} state={u}>
                    <li>
                      <i className="bi bi-pencil-square"></i> Edit
                    </li>
                  </Link>
                  <Link to={`/tasks/delete/${u.id}`} state={u}>
                    <li>
                      <i className="bi bi-trash"></i> Delete
                    </li>
                  </Link>
                  <Link to={`/tasks/view/${u.id}`}>
                    <li>
                      <i className="bi bi-eye"></i> View
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TaskComponent;
