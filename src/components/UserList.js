import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../services/userService';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-uppercase my-2">User Management</h2>
            <Link to="/add" className="btn btn-primary mb-3">Add User</Link>
            <br /><br />
            <Table striped hover variant="dark" className="table-dark">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        {/* <th>Role</th> */}
                        <th>Status</th>
                        <th>Email</th>
                        <th>Date of Creation</th>
                        <th colSpan="2" className="actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className='actions'><Image className="imgsrc" src={require('../images/user.jpg')} rounded alt='user' /></td>
                            <td><div>
                                <p className='nameClass'>{user.name}</p>
                                <p className='roleClass' >{user.role}</p>
                            </div></td>
                            {/* <td>{user.role}</td> */}
                            <td style={{ paddingTop: '2rem' }}>{user.status}</td>
                            <td style={{ paddingTop: '2rem' }}>{user.email}</td>
                            <td style={{ paddingTop: '2rem' }}>{user.creationDate}</td>
                            <td style={{ paddingTop: '2rem' }} className='actions'><Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm mr-2">
                                <Image className="imgbutton" src={require('../images/edit.jpg')} rounded alt='Edit' />
                            </Link> </td>
                            <td style={{ paddingTop: '2rem' }} className='actions'><button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">
                                <Image className="imgbutton" src={require('../images/delete.jpg')} rounded alt='Delete' />
                            </button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;
