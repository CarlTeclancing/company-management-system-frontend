import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DeleteUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: u } = location || {};

  useEffect(() => {
    const deleteUser = async (userId) => {
      try {
        const response = await axios.delete(`http://localhost:5000/v1/api/users/${userId}`)
        .then(res => {
            console.log('Deleted:', response.data);
    
            // Redirect after successful deletion
            navigate('/users');

        })
      } catch (error) {
        console.error('Delete failed:', error);
      }
    };

    if (u?.id) {
      deleteUser(u.id);
    }

    if(location.pathname == `/users/delete/${u.id}`){
      navigate('/users');
  }
  }, [u, navigate]);


  return null; // No UI needed
}

export default DeleteUser;
