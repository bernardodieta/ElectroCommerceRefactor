'use client'
import { useState } from "react";
import axios from "axios";

const AddNewAddress = ({ onClose }) => {
    const [formData, setFormData] = useState({
        country: "",
        state: "",
        city: "",
        zipcode: "",
        addressText: "",
        numext: ""
    });

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/address/save', formData);
            setSuccessMessage('Dirección guardada exitosamente');
            onClose(); 
        } catch (error) {
            setErrorMessage('Error al guardar la dirección');
        }
    };

    return (
        <div className="">
            <h2>Agregar Nueva Dirección</h2>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>País:</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} />
                </div>
                <div>
                    <label>Estado:</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} />
                </div>
                <div>
                    <label>Ciudad:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div>
                    <label>Código Postal:</label>
                    <input type="number" name="zipcode" value={formData.zipcode} onChange={handleChange} />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input type="text" name="addressText" value={formData.addressText} onChange={handleChange} />
                </div>
                <div>
                    <label>Número:</label>
                    <input type="number" name="numext" value={formData.numext} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onClose}>Cancelar</button> 
                </div>
            </form>
        </div>
    );
};

export default AddNewAddress;
