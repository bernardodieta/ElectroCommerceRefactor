import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import styles from "./newaddress.module.css";

// Componente Modal
const Modal = ({ children, onClose }) => {
    const handleClickOutside = (e) => {
        e.stopPropagation(); // Evita que el clic fuera del modal lo cierre
    };

    return (
        <div className={styles.modalBackdrop} onClick={handleClickOutside}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}

            </div>
        </div>
    );
};

export const NewAddress = ({ address, onUpdate, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedAddress, setEditedAddress] = useState({ ...address });

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setIsModalOpen(true); // Abre el modal
    };

    const handleDeleteAddress = async (e) => {
        e.stopPropagation();
        try {
            await axios.delete(`/api/address/${address._id}`, {
                withCredentials: true,
            });
            onDelete(address._id);
        } catch (error) {
            console.error("Error al borrar la dirección:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress({ ...editedAddress, [name]: value });
    };

    const handleSave = async (e) => {
        e.stopPropagation();
        try {
            const response = await axios.put(
                `/api/address/${address._id}`,
                editedAddress,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            onUpdate(response.data.payload);
            setIsModalOpen(false); // Cierra el modal después de guardar
        } catch (error) {
            console.error("Error al actualizar la dirección:", error);
        }
    };

    useEffect(() => {
        setEditedAddress({ ...address });
    }, [address]);

    return (
        <div onClick={handleToggle} className={styles.addressCardContainer}>
            {isExpanded ? (
                <p></p>
            ) : (
                <div className={styles.desplegarText}>

                    <h3>Ciudad: {address.city}</h3>
                    <h3>Dirección: {address.addressText}</h3>
                </div>
            )}

            <p className={styles.expanded}>{isExpanded ? "Contraer" : "Desplegar"}</p>
            {isExpanded && (
                <div className={styles.containerAddressLineText}>
                    <div className={styles.addressLineText}>
                        <p>Dirección: </p>
                        <p>{address.addressText}</p>
                    </div>
                    <div className={styles.addressLineText}>
                        <p>Numero exterior: </p>
                        <p>{address.numext}</p>
                    </div>
                    <div className={styles.addressLineText}>
                        <p>Código Postal: </p>
                        <p>{address.zipcode}</p>
                    </div>
                    <div className={styles.addressLineText}>
                        <p>Ciudad: </p>
                        <p>{address.city}</p>
                    </div>
                    <div className={styles.addressLineText}>
                        <p>Estado: </p>
                        <p>{address.state}</p>
                    </div>

                    <div className={styles.btnContainer}>
                        <button onClick={handleEdit} className={styles.btnEditar}>
                            <FaEdit className="mr-1" /> Editar
                        </button>
                        <button onClick={handleDeleteAddress} className={styles.btnEditar}>
                            <FaTrash className="mr-1" /> Borrar
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <h2>Editar Dirección</h2>
                    <input
                        type="text"
                        name="addressText"
                        value={editedAddress.addressText}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="numext"
                        value={editedAddress.numext}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="zipcode"
                        value={editedAddress.zipcode}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        value={editedAddress.city}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="state"
                        value={editedAddress.state}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="country"
                        value={editedAddress.country}
                        onChange={handleChange}
                    />
                    <div className={styles.btnContainer}>
                        <button
                            onClick={handleSave}
                            className={styles.btnEditar}
                        >
                            Guardar
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className={styles.btnEditar}
                        >
                            Cancelar
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};
