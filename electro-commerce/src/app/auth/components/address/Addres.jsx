import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCity, FaFlag, FaHome, FaEnvelope, FaMapMarkerAlt, FaGlobeAmericas } from 'react-icons/fa';
import axios from 'axios';
import styles from './address.module.css';

export const Address = ({ address, onUpdate, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editable, setEditable] = useState(false);
    const [editedAddress, setEditedAddress] = useState({ ...address });

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        setEditable(false);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setEditable(true);
    };

    const handleDeleteAddress = async (e) => {
        e.stopPropagation();
        try {
            await axios.delete(`/api/address/${address._id}`, {
                withCredentials: true,
            });
            onDelete(address._id);
        } catch (error) {
            console.error('Error al borrar la dirección:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress({ ...editedAddress, [name]: value });
    };

    const handleSave = async (e) => {
        e.stopPropagation();
        try {
            const response = await axios.put(`/api/address/${address._id}`, editedAddress, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onUpdate(response.data.payload);
            setEditable(false);
        } catch (error) {
            console.error('Error al actualizar la dirección:', error);
        }
    };

    useEffect(() => {
        setEditedAddress({ ...address });
    }, [address]);

    return (
        <div className={styles.addresCOntainerMain}>
            <div onClick={handleToggle} className="cursor-pointer">
                <div className={styles.desplegarText}>
                    <h3><FaCity className="inline mr-2" /> Ciudad: <span className="font-semibold">{address.city}</span></h3>
                    <p>{isExpanded ? 'Click para contraer' : 'Click para desplegar'}</p>
                </div>
                {isExpanded && (
                    <div className={styles.addressGaptext}>
                        <h3 className={styles.inlineAddress}><FaHome className="inline mr-2" /> Dirección:
                            {editable ? (
                                <input
                                    type="text"
                                    name="addressText"
                                    value={editedAddress.addressText}
                                    onChange={handleChange}
                                    onClick={(e) => e.stopPropagation()}
                                    className={styles.inputEditAddress}
                                />
                            ) : (
                                <span className="font-semibold">{address.addressText}</span>
                            )}
                        </h3>
                        <h3 className={styles.inlineAddress}><FaEnvelope  /> Número exterior:
                            {editable ? (
                                <input
                                    type="text"
                                    name="numext"
                                    value={editedAddress.numext}
                                    onChange={handleChange}
                                    onClick={(e) => e.stopPropagation()}
                                    className={styles.inputEditAddress}
                                />
                            ) : (
                                <span className="font-semibold">{address.numext}</span>
                            )}
                        </h3>
                        <h3 className={styles.inlineAddress} ><FaEnvelope /> Código Postal:
                            {editable ? (
                                <input
                                    type="text"
                                    name="zipcode"
                                    value={editedAddress.zipcode}
                                    onChange={handleChange}
                                    onClick={(e) => e.stopPropagation()}
                                    className={styles.inputEditAddress}
                                />
                            ) : (
                                <span className="font-semibold">{address.zipcode}</span>
                            )}
                        </h3>


                        <h3 className={styles.inlineAddress}><FaCity className="inline mr-2" /> Ciudad:
                            {editable ? (
                                <input
                                    type="text"
                                    name="city"
                                    value={editedAddress.city}
                                    onChange={handleChange}
                                    onClick={(e) => e.stopPropagation()}
                                    className={styles.inputEditAddress}
                                />
                            ) : (
                                <span className="font-semibold">{address.city}</span>
                            )}
                        </h3>
                        <h3 className={styles.inlineAddress}><FaMapMarkerAlt className="inline mr-2" /> Estado:
                            {editable ? (
                                <input
                                    type="text"
                                    name="state"
                                    value={editedAddress.state}
                                    onChange={handleChange}
                                    onClick={(e) => e.stopPropagation()}
                                    className={styles.inputEditAddress}
                                />
                            ) : (
                                <span className="font-semibold">{address.state}</span>
                            )}
                        </h3>
                        <h3 className={styles.inlineAddress}><FaGlobeAmericas className="inline mr-2" /> País:
                            {editable ? (
                                <input
                                    type="text"
                                    name="country"
                                    value={editedAddress.country}
                                    onChange={handleChange}
                                    onClick={(e) => e.stopPropagation()}
                                    className={styles.inputEditAddress}
                                />
                            ) : (
                                <span className="font-semibold">{address.country}</span>
                            )}
                        </h3>

                    </div>
                )}
            </div>
            {isExpanded && !editable && (
                <div className={styles.AddresBox}>
                    <button onClick={handleEdit} className={styles.btnEdit}>
                        <FaEdit className="mr-1" /> Editar
                    </button>
                    <button onClick={handleDeleteAddress} className={styles.btnEdit}>
                        <FaTrash className="mr-1" /> Borrar
                    </button>
                </div>
            )}
            {editable && (
                <div className="flex items-center space-x-2 mt-4">
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Guardar
                    </button>
                    <button onClick={() => setEditable(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};