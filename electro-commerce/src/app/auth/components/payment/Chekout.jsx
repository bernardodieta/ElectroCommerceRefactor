'use client';
import { useEffect, useState } from "react";
import PaymentServices from "@/services/payment.js";
import PaymentForm from "./PayForm";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from "axios";
import styles from './Checkout.module.css';

const apiPublicKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(apiPublicKey);

const Checkout = () => {
    const [address, setAddress] = useState([]);
    const [order, setOrder] = useState({});
    const [selectedAddress, setSelectedAddress] = useState('');
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!order._id) {
                try {
                    const orderStatus = await axios.get('/api/cart/prepurchase/');
                    const addressList = await axios.get('/api/address/');
                    if (orderStatus.status === 200 && addressList.status === 200) {
                        setAddress(addressList.data.payload);
                        setOrder(orderStatus.data.payload);
                    } else {
                        console.log('Algo salió mal');
                    }
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            }
        };
        fetchOrder();
    }, []);

    const handleAddressChange = async (event) => {
        const selectedId = event.target.value;
        const selectedAddr = address.find(addr => addr._id === selectedId);
        setSelectedAddress(selectedAddr);

        try {
            await axios.post(`/api/orders/${order._id}`, { selectedAddress: selectedAddr });
        } catch (error) {
            console.error('Error actualizando dirección en la orden:', error);
        }
    };

    const handlePaymentIntent = async () => {
        if (order._id) {
            const service = new PaymentServices();
            try {
                await service.createPaymentIntent({
                    orderId: order._id,
                    callbackSuccess: (res) => setClientSecret(res),
                    callbackError: (err) => console.error("Error en createPaymentIntent:", err),
                });
            } catch (error) {
                console.error("Error en la creación del intento de pago:", error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Orden de Compra</h1>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Detalles de la compra</h2>
                <div className={styles.orderDetails}>
                    <p><strong>ID de Orden:</strong> {order._id}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                </div>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Seleccione una dirección de envío</h2>
                <select
                    className={styles.select}
                    value={selectedAddress._id || ''}
                    onChange={handleAddressChange}
                >
                    <option value="" disabled>Seleccione una dirección:</option>
                    {address.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                            {addr.addressText}, {addr.city}, {addr.state}, {addr.country}, {addr.zipcode}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.section}>
                <h1 className={styles.sectionTitle}>Stripe Payment</h1>
                {!clientSecret ? (
                    <button onClick={handlePaymentIntent} className={styles.button}>
                        Obtener clientSecret y continuar
                    </button>
                ) : (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm order={order} />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default Checkout;
