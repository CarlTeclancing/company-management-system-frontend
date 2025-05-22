import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import userImg from '../../../assets/images/user1.png';
import { AppContext } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function UserList() {
  const { users, setUsers } = useContext(AppContext);
  const { user, companyId } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState('');

  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // if (!storedUser) {
    //   console.warn('No user found in localStorage');
    //   setIsLoading(false);
    //   return;
    // }

    // let parsedUser;
    // try {
    //   parsedUser = JSON.parse(storedUser);
    //   console.log('Parsed User:', parsedUser);
    // } catch (error) {
    //   console.error('Error parsing user from localStorage:', error);
    //   setIsLoading(false);
    //   return;
    // }

    // const companyId = parsedUser?.company_id;

    // if (companyId === undefined || companyId === null || isNaN(Number(companyId))) {
    //   console.warn('Invalid company_id in parsed user object:', companyId);
    //   setErrorFetching('User has invalid or missing company ID.');
    //   setIsLoading(false);
    //   return;
    // }

    const id = companyId;
    console.log(id)

    //console.log('Fetching users for company ID:', id);

    const getUserById = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/v1/api/company/${id}`);
        setUsers(response.data);
        console.log('Fetched users:', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorFetching(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserById(id);
  }, [user, companyId, setUsers]);

  if (isLoading) return <p>Loading users... (Check console for debug)</p>;
  if (errorFetching) return <p>Error fetching users: {errorFetching}</p>;
  if (!users || users.length === 0) return <p>No users found for this company.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Img</th>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Country</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, index) => (
          <tr key={u.id || index}>
            <td><img src={userImg} alt="User" style={{ width: '40px' }} /></td>
            <td>{u.id}</td>
            <td>{u.full_name}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
            <td>{u.address}</td>
            <td>{u.role}</td>
            <td className='drop'>
              <i class="bi bi-three-dots"></i>
              <div className="drop-down">
                <ul>
                  <Link to={`/users/edit/${u.id}`}>
                    <li><i class="bi bi-pencil-square"></i> Edit</li>
                  </Link>
                  <Link 
                  to={`/users/delete/${u.id}`}
                  state={u}
                  >
                    <li><i class="bi bi-trash"></i> Delete</li>
                  </Link>
                  <Link to={`/users/view/${u.id}`}>
                    <li><i class="bi bi-eye"></i> View</li>
                  </Link>
                </ul>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
