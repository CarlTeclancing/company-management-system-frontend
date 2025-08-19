import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL} from '../../../globals';

function DeleteClient() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: client } = location || {};
  
  useEffect(() => {
    
    const userId = client.id;
    const deleteUser = async (userId) => {
      try {
        const response = await axios.delete(`${BASE_URL}/clients/${userId}`)
        .then(res => {
            console.log('Deleted:', response.data);
    
            // Redirect after successful deletion
            navigate('/clients');

        })
      } catch (error) {
        console.error('Delete failed:', error);
      }
    };

    if (client?.id) {
      deleteUser(client.id);
    }

    if(location.pathname == `/clients/delete/${client.id}`){
      navigate('/clients');
  }
  }, [client, navigate]);


  return null; // No UI needed
}

export default DeleteClient;
