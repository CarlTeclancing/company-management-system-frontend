import App from "../App";
import Login from "../pages/auth/Login";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import Onboarding from "../pages/auth/Onboarding";
import Dashbaord from "../pages/dashboard/Index";
import Users from "../pages/users/Users";
import Client from "../pages/client/Client";
import Projects from "../pages/projects/Projects";

// Define your router configuration
 const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ResetPassword />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/dashboard',
    element: <Dashbaord />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/clients',
    element: <Client />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
]);


export default router