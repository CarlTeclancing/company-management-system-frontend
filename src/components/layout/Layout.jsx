import React, { Children } from 'react'
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

  if(isLoggedIn === false) {
    navigate('/login');
  }

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