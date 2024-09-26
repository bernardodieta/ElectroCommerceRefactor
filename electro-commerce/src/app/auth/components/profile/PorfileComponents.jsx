'use client'
import React, { useState, useEffect } from 'react';
import { useUsersStore } from '@/store/userStore';
import axios from 'axios'; // Importamos Axios
import styles from './profile.module.css';
import { CiEdit } from "react-icons/ci";
import { AddressList } from '../address/AddressList';
import { useRouter } from "next/navigation";
import AddNewAddress from '../address/AddNewAddress';


export const ProfileComponents = () => {
    const router = useRouter();

    const user = useUsersStore((state) => state.user);
    const setUser = useUsersStore((state) => state.setUser);

    const [isEditing, setIsEditing] = useState({
        firstName: false,
        last_name: false,
        email: false,
        date: false,
        tel: false,
    });


    const [tempUser, setTempUser] = useState({
        firstName: user?.firstName || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        date: user?.date || '',
        tel: user?.tel || '',
    });

    useEffect(() => {
        setTempUser({
            firstName: user?.firstName || '',
            last_name: user?.last_name || '',
            email: user?.email || '',
            date: user?.date || '',
            tel: user?.tel || '',
        });
    }, [user]);

    const handleEditClick = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const [showModal, setShowModal] = useState(false); 

    const handleClickRouter = () => {
        setShowModal(true); 
    };

    const closeModal = () => {
        setShowModal(false);
    };
   
    const handleSave = async (field) => {
        try {
            let userUpdate = {
                [field]: tempUser[field],
            };

            const response = await axios.put('/api/users/profile/edit/', {
                userUpdate
            });

            if (response.status === 201) {
                console.log(response.data);

                setUser({
                    ...user,
                    ...response.data, 
                });

                setIsEditing((prevState) => ({
                    ...prevState,
                    [field]: false,
                }));

                console.log('Datos actualizados correctamente:', response.data);
            }
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
        }
    };

    return (
        <>
            {user && (
                <div className={styles.profileMain}>
                    <div className={styles.titleContainer}>
                        <div className={styles.barritaTitle}>
                            <div className={styles.barrita}></div>
                            <h2>Perfil de usuario</h2>
                        </div>
                        <p>Todos los datos pueden ser modificados excepto el email.</p>
                    </div>
                    <div className={styles.profileContainer}>
                        <h2 className={styles.title}>Datos Personales</h2>
                        <div className={styles.profileBoxDetail}>
                            <div className={styles.textoProfile}>
                                <div className={styles.detailText}>
                                    <h3>Nombre:</h3>
                                    {isEditing.firstName ? (
                                        <>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={tempUser.firstName}
                                                onChange={handleInputChange}
                                                className={styles.inputEdit}
                                            />
                                            <button onClick={() => handleSave('firstName')} className={styles.btnGuardarEdit}>
                                                Guardar
                                            </button>
                                        </>
                                    ) : (
                                        <p>{user.firstName}</p>
                                    )}
                                    <CiEdit size={40} onClick={() => handleEditClick('firstName')} className={styles.iconEditProfile} />
                                </div>

                                <div className={styles.detailText}>
                                    <h3>Apellido:</h3>
                                    {isEditing.last_name ? (
                                        <>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={tempUser.last_name}
                                                onChange={handleInputChange}
                                                className={styles.inputEdit}
                                            />
                                            <button onClick={() => handleSave('last_name')} className={styles.btnGuardarEdit}>
                                                Guardar
                                            </button>
                                        </>
                                    ) : (
                                        <p>{user.lastName}</p>
                                    )}
                                    <CiEdit size={40} onClick={() => handleEditClick('last_name')} className={styles.iconEditProfile} />
                                </div>

                                <div className={styles.detailText}>
                                    <h3>Email:</h3>
                                    <p>{user.email}</p>
                                    <CiEdit size={40} onClick={() => handleEditClick('last_name')} className={styles.iconEditProfile} />
                                </div>

                                <div className={styles.detailText}>
                                    <h3>Edad:</h3>
                                    {isEditing.date ? (
                                        <>
                                            <input
                                                type="text"
                                                name="date"
                                                value={tempUser.date}
                                                onChange={handleInputChange}
                                                className={styles.inputEdit}
                                            />
                                            <button onClick={() => handleSave('date')} className={styles.btnGuardarEdit}>
                                                Guardar
                                            </button>
                                        </>
                                    ) : (
                                        <p>{user.date}</p>
                                    )}
                                    <CiEdit size={40} onClick={() => handleEditClick('date')} className={styles.iconEditProfile} />
                                </div>

                                <div className={styles.detailText}>
                                    <h3>Telefono:</h3>
                                    {isEditing.tel ? (
                                        <>
                                            <input
                                                type="text"
                                                name="tel"
                                                value={tempUser.tel}
                                                onChange={handleInputChange}
                                                className={styles.inputEdit}
                                            />
                                            <button onClick={() => handleSave('tel')} className={styles.btnGuardarEdit}>
                                                Guardar
                                            </button>
                                        </>
                                    ) : (
                                        <p>{user.tel}</p>
                                    )}
                                    <CiEdit size={40} onClick={() => handleEditClick('tel')} className={styles.iconEditProfile} />
                                </div>

                                <div className={styles.detailText}>
                                    <h3>Rol:</h3>
                                    <p>{user.role}</p>
                                </div>
                            </div>
                            <div className={styles.imgContainerProfile}>
                                Foto de perfil
                                <img src="../imagenes/yo.png" alt="" />
                                <button className={styles.btnEdit}>Editar</button>
                            </div>
                        </div>
                        <div className={styles.cuentProfileContainer}>
                            <h2 className={styles.title}>Datos de cuenta</h2>
                            {user ? (
                                <div className={styles.accountBox}>
                                    <div className={styles.detailTextAcount}>
                                        <h3>Usuario:</h3>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className={styles.detailTextAcount}>
                                        <h3>Contraseña:</h3>
                                        <p>{user.password}</p>
                                        <button className={styles.btnEdit}>Cambiar</button>
                                    </div>
                                    <div className={styles.detailTextAcount}>
                                        <h3>Fecha de registro:</h3>
                                        <p>{user.registrationDate}</p>
                                    </div>

                                </div>) : (
                                <div>

                                </div>)
                            }
                        </div>


                        <div className={styles.addresscontainer}>
                            <h2 className={styles.title}>Direcciónes de envío</h2>
                            <div>
                                <AddressList />
                            </div>

                            <button onClick={handleClickRouter}>Agregar nueva direccion</button>
                        </div>

                    
                        {showModal && (
                            <div className={styles.modalBackdrop}>
                                <div className={styles.modalContent}>
                                    <AddNewAddress onClose={closeModal} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
