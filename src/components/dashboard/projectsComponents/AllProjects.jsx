import React, {useState, useEffect, useContext} from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { AppContext } from '../../../contexts/AppContext';
import ProjectCard from './ProjectCard';
import axios from 'axios';

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
    
  return (
    <div className='row'>
      {projects.map((index, project) =>(
        <ProjectCard  key={index} project={project}/>
      ))}
      
    </div>
  )
}

export default AllProjects
