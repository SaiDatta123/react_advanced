import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addUser, getUser, updateUser } from '../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';


const AddEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    role: '',
    status: '',
    email: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getUser(id).then(data => setUser(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user.name || !user.email || !user.role || !user.status) {
      setError('All details are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setError('Invalid email format');
      return;
    }

    const userData = { ...user, creationDate: user.creationDate || new Date().toJSON().slice(0, 10) };

    if (id) {
      await updateUser(id, userData);
    } else {
      await addUser(userData);
    }

    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className='my-2 '>{id ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">---select---</option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
            <option value="Registered">Registered</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={user.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">---select---</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Banned">Banned</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Save
        </button> &nbsp;&nbsp;
        <button type="button" className="btn btn-info" onClick={handleBack}>Back</button>
      </form>
    </div>
  );
};

export default AddEditUser;
