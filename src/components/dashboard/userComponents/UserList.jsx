import React, { useContext, useEffect, useState } from 'react';
import userImg from '../../../assets/images/user1.png';
import { AppContext } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';

function UserList() {
  const { users, setUsers } = useContext(AppContext);
        const {
          user,
          setUser,
          isLoggedIn,
          setIsLoggedIn
        } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState('');
  
  
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      console.log('Parsed User:', parsedUser);
      const id = parsedUser?.company_id || parsedUser.company_id;
      console.log('Company ID:', id);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  } else {
    console.warn('No user found in localStorage');
  }
  

  //sellecting all users in the company
  
  useEffect(() =>{

    const getUserById = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/v1/api/company/${id}}`);
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setUsers(data); // Assuming you have a `setUser` hook
          console.table(data);
        } catch (error) {
          console.error('Error fetching user:', error);
          setErrorFetching(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      

      getUserById();
  }, [setUsers]);

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
            <td><img src={userImg} alt="User" /></td>
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
