'use client';
import { useEffect, useState } from "react";
import { Address } from "./Addres";
import axios from "axios";
import styles from './newaddress.module.css';
import { NewAddress } from "./NewAddres";

export const AddressList = () => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('/api/address');
                setAddresses(response.data.payload);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };
        fetchAddresses();
    }, []);

    const handleDeleteAddress = (id) => {
        setAddresses(prevAddresses => prevAddresses.filter(address => address._id !== id));
    };
    const handleUpdateAddress = (updatedAddress) => {
        setAddresses(prevAddresses =>
            prevAddresses.map(address =>
                address._id === updatedAddress._id ? updatedAddress : address
            )
        );
    };

    return (
        <div className={styles.addressBoxList}>

            {addresses.length > 0 && addresses.map(address => (
                <NewAddress key={address._id} address={address} onUpdate={handleUpdateAddress} onDelete={handleDeleteAddress} />
            ))}
        </div>
    );
};