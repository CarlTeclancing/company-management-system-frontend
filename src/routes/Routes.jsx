import App from "../App";
import Login from "../pages/auth/Login";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import Onboarding from "../pages/auth/Onboarding";
import Dashbaord from "../pages/dashboard/Index";
import Users from "../pages/users/Users";
import Client from "../pages/client/Clients";
import Projects from "../pages/projects/Projects";
import Settings from "../pages/settings/Settings";
import Task from "../pages/task/Task";
import DeleteUser from "../pages/users/DeleteUser";
import EditUser from "../pages/users/EditUser";
import Clients from "../pages/client/Clients";
import Meetings from "../pages/meetings/Meetings";
import Messages from "../pages/messages/Messages";
import Invoice from "../pages/invoices/Invoice";

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
  {
    path: '/dashboard/settings',
    element: <Settings />,
  },
  {
    path: '/task',
    element: <Task />,
  },
  {
    path: '/users/delete/:id',
    element: <DeleteUser />,
  },
  {
    path: '/users/edit/:id',
    element: <EditUser />,
  },
  {
    path: '/clients',
    element: <Clients />,
  },
  {
    path: '/meetings',
    element: <Meetings />,
  },
  {
    path: '/messages',
    element: <Messages/>,
  },
  {
    path: '/invoices',
    element: <Invoice/>,
  },
]);


export default router