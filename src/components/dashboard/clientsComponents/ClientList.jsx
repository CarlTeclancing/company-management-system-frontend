import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';
import { CLIENTS } from '../../../../globals';

const ClientList = () => {

  const [clients, setClients ] = useState([])
  const [isLoading, setIsLoading ] = useState(true)
  const [errorFetching, setErrorFetching ] = useState(false)

      //getting the company id from authcontext
        const {
          user,
          setUser,
          companyId,
          isLoggedIn,
          setIsLoggedIn
        } = useAuth();

  useEffect(() => {

     const id = companyId
      const getClients = async (id) => {
      try {
        const response = await axios.get(`${CLIENTS}/${id}`);
        setClients(response.data);
        console.log('Fetched clients:', response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setErrorFetching(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getClients(id);

  }, [companyId])

  if(isLoading === true) return <p>Feting data .......</p>
  if(errorFetching === true) return <p>Hey 😉 Error Fetching data!</p>
  return (
   <table>
  <thead>
    <tr>
      <th>Client Name</th>
      <th>Email</th>
      <th>Number</th>
      <th>Address</th>
      <th>Send Mail</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {clients.map((client) => (
      <>
      <br />
    
      <tr key={client.id}>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.number}</td>
        <td>{client.address}</td>
        <td><i className="bi bi-envelope"></i></td>
        <td className='drop'>
          <i className="bi bi-three-dots"></i>
          <div className="drop-down">
            <ul>
              <Link to={`/clients/edit/${client.id}`} state={1}>
                <li><i className="bi bi-pencil-square"></i> Edit</li>
              </Link>
              <br />
              <Link to={`/clients/delete/${client.id}`} state={1}>
                <li><i className="bi bi-trash"></i> Delete</li>
              </Link>
              <br />
              <Link to={`/clients/mail/${client.id}`} state={1}>
                <li><i className="bi bi-envelope"></i> Send Mail</li>
              </Link>
            </ul>
          </div>
        </td>
      </tr>
      </>
    ))}
  </tbody>
</table>

  )
}

export default ClientList
