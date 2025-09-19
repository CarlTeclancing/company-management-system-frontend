import React, { Children, useState, useEffect } from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function Layout( {children}) {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024); // treat <1024px as mobile/tablet
      };
  
      handleResize(); // check on first load
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

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

      if (isMobile) {
    return (
      <div style={{ 
        display: "flex", 
        height: "100vh", 
        justifyContent: "center", 
        alignItems: "center", 
        textAlign: "center", 
        padding: "20px" 
      }}>
        <h2>Please use a desktop for the best experience  </h2>
        <p>Our Mobile App is comming soon.....</p>
      </div>
    );
  }
  return (
    <div className='container'>
        <SideBar />
        <div className="col-main">
            <TopBar logout={logout}/>
            {children}
        </div>
    </div>
  )
}

export default Layout
