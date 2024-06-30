import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null)
  const [user, setUser] = useState(null)

  return (
    <Router>
      <Layout isAuthenticated={isAuthenticated} authToken={authToken} user={user}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} setAuthToken={setAuthToken} setUser={setUser}/>}
          />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} authToken={authToken}/> : <Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
