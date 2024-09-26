'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEye, FaUserShield } from 'react-icons/fa';
import styles from './UsersList.module.css';
import UserDetailsModal from './UserDetailsModal';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Para abrir el modal con detalles del usuario
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/asd/all', {
          withCredentials: true,
        });
        setUsers(response.data.payload);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los usuarios');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Función para eliminar usuario
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/asd/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Error al eliminar el usuario', err);
    }
  };

  // Función para ver los detalles del usuario en un modal
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Función para cambiar el rol del usuario a ADMIN
  const handleMakeAdmin = async (userId) => {
    try {
      await axios.put(`/api/users/profile/edit/`, {
        userUpdate: {
          role: 'ADMIN',
        }
      }, {
        withCredentials: true,
      });
      setUsers(users.map(user => user._id === userId ? { ...user, role: 'ADMIN' } : user));
    } catch (err) {
      console.error('Error al cambiar el rol del usuario', err);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Usuarios</h1>
      <ul className={styles.userList}>
        {users.map(user => (
          <li key={user._id} className={styles.userItem}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.first_name} {user.last_name}</span>
              <span className={styles.userRole}>({user.role})</span>
            </div>
            <div className={styles.actionButtons}>
              <button onClick={() => handleViewDetails(user)} className={styles.actionBtn} title="Ver detalles">
                <FaEye />
              </button>
              <button onClick={() => handleDeleteUser(user._id)} className={styles.actionBtn} title="Eliminar">
                <FaTrashAlt />
              </button>
              {user.role !== 'ADMIN' && (
                <button onClick={() => handleMakeAdmin(user._id)} className={styles.actionBtn} title="Hacer Admin">
                  <FaUserShield />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {showModal && selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

export default UsersList;
