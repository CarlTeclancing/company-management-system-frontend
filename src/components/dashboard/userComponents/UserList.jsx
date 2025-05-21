import React, { useContext, useEffect, useState } from 'react';
import userImg from '../../../assets/images/user1.png';
import { AppContext } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';

function UserList() {
  const { users, setUsers } = useContext(AppContext);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState('');

  useEffect(() => {
    // Get and parse user from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      console.warn('No user found in localStorage');
      setIsLoading(false);
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(storedUser);
      console.log('Parsed User:', parsedUser);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      setIsLoading(false);
      return;
    }

    const companyId = parsedUser?.company_id;

    if (companyId === undefined || companyId === null || isNaN(Number(companyId))) {
      console.warn('Invalid company_id in parsed user object:', companyId);
      setErrorFetching('User has invalid or missing company ID.');
      setIsLoading(false);
      return;
    }
    

    const id = parseInt(companyId); // ensures it's a number

    console.log('Fetching users for company ID:', id);

    const getUserById = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/v1/api/company/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        console.log('Fetched users:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorFetching(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserById();
  }, [user, setUsers,]);

  // UI Rendering
  if (isLoading) {
    return <p>Loading users... (Check console for debug)</p>;
  }

  if (errorFetching) {
    return <p>Error fetching users: {errorFetching}</p>;
  }

  if (!users || users.length === 0) {
    return <p>No users found for this company.</p>;
  }

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
            <td>...</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
