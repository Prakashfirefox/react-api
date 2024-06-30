import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signIn } from '../services/user';

const Login = ({ setIsAuthenticated, setAuthToken, setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const payLoad = {
        username: username,
        password : password
    }
     const response  = await signIn(payLoad);
     if(response.status){
        setIsAuthenticated(true);
        setUser(response.user);
        setAuthToken(response.token);
     }
     else{
        alert(response.message);
     }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={()=>handleSubmit()} className="btn btn-primary">Login</button>
    </div>
  );
};

export default Login;
