import React, { useState, useContext, createContext } from 'react';
import { AuthContext } from './AuthContext'; // ✅ Import the context, not the provider

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [task, setTask] = useState([]);
  const [files, setFiles] = useState([]);
  const [finances, setFinances] = useState([]);

  const { user, setUser } = useContext(AuthContext); // ✅ Use the context object here

  return (
    <AppContext.Provider
      value={{
        clients, setClients,
        users, setUsers,
        user, setUser,
        products, setProducts,
        projects, setProjects,
        task, setTask,
        files, setFiles,
        finances, setFinances
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
