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
    companyId,
    setCompanyId,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();

  //checking if user is login before grating access to the layout
  
  useEffect(() => {
      // const storedUser = localStorage.getItem('user');
      // const token = localStorage.getItem('token');
      // //setUser(JSON.stringify(storedUser))
      // const parsedUser = JSON.parse(storedUser);
      // setUser(parsedUser);
      // console.log('User data:', user);
      // console.log(user?.company_id)

      // if (storedUser && token) {
      //   setUser(storedUser);
      //   console.log('User data:', user);

      // }
      if (!user && !companyId) {
        navigate('/login');
      }
      // if(isLoggedIn === false) {
        
      //   navigate('/login');
      // }

    }, [ isLoggedIn, navigate]);





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