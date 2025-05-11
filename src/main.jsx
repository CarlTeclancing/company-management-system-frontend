import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import ProjectStatus from './components/dashboard/ProjectStatus.jsx';
import router from './routes/Routes.jsx';
import AppContextProvider from './contexts/AppContext.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext.jsx';

// Render the app with the router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </AuthProvider>
  </StrictMode>
);

