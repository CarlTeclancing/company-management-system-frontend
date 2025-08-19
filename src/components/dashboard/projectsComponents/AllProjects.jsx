import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { AppContext } from '../../../contexts/AppContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../../globals';


const AllProjects = () => {
  const { user, companyId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const { projects, setProjects } = useContext(AppContext);
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 at a time
  const [errorFetching, setErrorFetching] = useState('');

  useEffect(() => {
    const getCompaniesById = async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/projects/${id}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
        setErrorFetching(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) getCompaniesById(companyId);
  }, [companyId, user]);

  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 5); // Load next 5 items
      setLoadMoreLoading(false);
    }, 1000); // Simulated loading time
  };

  if (isLoading) return <p>Loading projects...</p>;
  if (errorFetching) return <p>Error fetching projects: {errorFetching}</p>;
  if (!projects || projects.length === 0) return <p>No projects found for this company</p>;

  return (
    <div className='row-narrow'>
      {projects.slice(0, visibleCount).map((project) => (
        <div className="card-container" key={project.id}>
          <div className="card-checkmark">&#10003;</div>
          <div className="card-header">
            <h3>{project?.name}</h3>
            <td className='drop'>
              <i className="bi bi-three-dots"></i>
              <div className="drop-down">
                <ul>
                  <Link to={`/projects/edit/${project.id}`} state={project}><li>Edit</li></Link>
                  <Link to={`/projects/delete/${project.id}`} state={project}><li>Delete</li></Link>
                  <Link to={`/projects/view/${project.id}`}><li>Change Status</li></Link>
                </ul>
              </div>
            </td>
          </div>

          <div className="card-status-row">
            <span className="status-badge">On Track</span>
            <span className="date">📅 {project?.start_date}</span>
          </div>

          <p className="description">{project?.description}</p>

          <div className="progress-section">
            <div className="progress-label">
              <span>Progress</span>
              <span className="progress-percentage">75%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="card-footer">
            <div className="team-avatars">
              <img src="https://i.pravatar.cc/30?img=1" alt="user1" />
              <img src="https://i.pravatar.cc/30?img=2" alt="user2" />
              <img src="https://i.pravatar.cc/30?img=3" alt="user3" />
            </div>
            <div className="milestones">Milestones<br /><strong>3 / 4</strong></div>
          </div>
        </div>
      ))}

      {visibleCount < projects.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {loadMoreLoading ? (
            <div className="loader"></div> // Optional spinner
          ) : (
            <button onClick={handleLoadMore} className="btn btn-secondary">View More</button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProjects;
