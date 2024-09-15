import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home.js'; // Import the Home component
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from '@emotion/react';
import theme from './components/theme';
import AppWrapper from './AppWrapper';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppWrapper>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            </Routes>
          </AppWrapper>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;