// src/routes/routes.js

const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    COMPANY: '/company',
    COMPANY_DETAIL: (id) => `/company/${id}`,
    USER_PROFILE: (userId) => `/user/${userId}`,
  };
  
  export default ROUTES;
  