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
import EditProjects from "../pages/projects/EditProjects";
import EditClient from "../pages/client/EditClients";
import DeleteClient from "../pages/client/DeleteClient";
import InvoiceDetails from "../pages/invoices/InvoiceDetails";
import Inventory from "../pages/inventory/Inventory";
import AiChat from "../pages/ai/AiChat";
import Test from "../pages/test/TestRoute";

// Define your router configuration
 const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
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
    path: '/projects/edit/:id',
    element: <EditProjects />,
  },
  {
    path: '/projects/view/:id',
    element: <Projects />,
  },
  {
    path: '/projects/delete/:id',
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
  {
    path: '/clients/edit/:id',
    element: <EditClient/>,
  },
  {
    path: '/clients/delete/:id',
    element: <DeleteClient />,
  },
  {
    path: '/invoices/invoice-details/:id',
    element: <InvoiceDetails />,
  },
  {
    path: '/inventory',
    element: <Inventory />,
  },
  {
    path: '/ai-chat',
    element: <AiChat />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);


export default router;