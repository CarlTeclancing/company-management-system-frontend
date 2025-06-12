import React, {useState, createContext, useEffect} from 'react';


export const UserContext = createContext();

const UserContextProvider =( {children} )=> {

  const [user, setUser ] = useState(null);
  
  return (

    <UserContext.Provider value={{user, setUser}}>
   
      {children}
    </UserContext.Provider>
    
  )
}

export default UserContextProvider;