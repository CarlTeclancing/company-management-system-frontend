import React, {useState, useEffect, useContext} from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { AppContext } from '../../../contexts/AppContext';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProjects = () => {
    const { user, companyId } = useAuth(); 
    const [isLoading, setIsLoading] = useState(true);
    const { projects, setProjects } = useContext(AppContext);
    const [errorFetching, setErrorFetching] = useState('');

    useEffect(() => {
      const id = companyId;
    
      const getCompaniesById = async (id) => {
        try {
          console.log("Fetching projects for companyId:", id);
          const response = await axios.get(`http://localhost:5000/v1/api/projects/${id}`);
          //console.log('Raw API Response:', response);
          setProjects(response.data);
          //console.log('Fetched Projects:', response.data);
          console.log("fetched projects : ", projects)
        } catch (error) {
          console.error('Error fetching projects:', error.message);
          setErrorFetching(error.response?.data?.message || error.message);
        } finally {
          setIsLoading(false);
        }
      };
    
      if (id) getCompaniesById(id);
    }, [companyId, user]);
    
    if(!projects || projects.length === 0 ) return <p>No projects found for this company</p>
    if(errorFetching)return <p>Error fetching projects: {errorFetching}</p>
    
  return (
    <div className='row-narrow'>
      {projects.map((project) =>(
         <div className="card-container" key={project.id}>
      <div className="card-checkmark">&#10003;</div>
            <div className="card-header">
            <h3>{project?.name}</h3>
             <td className='drop'>
                <i class="bi bi-three-dots"></i>
                <div className="drop-down">
                  <ul>
                    <Link 
                      to={`/projects/edit/${project.id}`}
                      state={project}
                      >
                      <li><i class="bi bi-pencil-square"></i> Edit</li>
                    </Link>
                    <Link 
                    to={`/projects/delete/${project.id}`}
                    state={project}
                    >
                      <li><i class="bi bi-trash"></i> Delete</li>
                    </Link>
                    <Link to={`/projects/view/${project.id}`}>
                      <li><i class="bi bi-eye"></i> View</li>
                    </Link>
                  </ul>
                </div>
              </td>
            </div>

            <div className="card-status-row">
            <span className="status-badge">On Track</span>
            <span className="date">📅 {project?.start_date}</span>
            </div>

            <p className="description">
            {project?.description}
            </p>

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
      
    </div>
  )
}

export default AllProjects
