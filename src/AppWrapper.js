import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const AppWrapper = ({ children }) => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

export default AppWrapper;
