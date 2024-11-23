import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css"

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username: name, password } = formData;

    if (!name || !password) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return;
    }


    setErrorMessage('');
    setSuccessMessage('Logging in');
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className="container container-fluid" id="registerbody">
      <h1 className="text-center mb-4" id='login_h1'>Login</h1>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your Username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
      </form>

      <div className="mt-3 text-center">
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
} 
  export default Login;
