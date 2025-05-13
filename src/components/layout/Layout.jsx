import React, { Children, useEffect } from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function Layout( {children}) {

  const navigate = useNavigate(); // Hook to navigate programmatically
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();

  //checking if user is login before grating access to the layout
  
  useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      console.log('User data:', user);

      // if (storedUser && token) {
      //   setUser(storedUser);
      //   console.log('User data:', user);

      // }
      if (!storedUser && !token) {
        navigate('/login');
      }
    }, [ navigate, setUser]);


  // if(isLoggedIn === false) {
  //   navigate('/login');
  // }


  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  }
  return (
    <div className='container'>
        <SideBar />
        <div className="col">
            <TopBar logout={logout}/>
            {children}
        </div>
    </div>
  )
}

export default Layout