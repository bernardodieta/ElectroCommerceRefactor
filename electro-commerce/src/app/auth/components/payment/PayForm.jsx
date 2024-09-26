import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createAlert, createAlertWithCallback } from '../../../../utils/alerts.js';
import { getHeader } from '@/services/axiosClient';
import AxiosClient from '@/services/axiosClient';
import styles from './PaymentForm.module.css';

const PaymentForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleConfirmationPay = async (paymentIntent) => {
        const requestInfo = {
            url: `/api/checkout?id=${order._id}`,
            body: { paymentIntent },
            config: { ...getHeader(), withCredentials: true },
        };
        try {
            const response = await AxiosClient.postRequest(requestInfo);
            console.log('response de confirmation:', response);
        } catch (error) {
            console.error('Error en la confirmación del pago:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe o los elementos no están listos.");
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({ elements, redirect: 'if_required' });

        if (!error && paymentIntent.status === "succeeded") {
            createAlertWithCallback('success', '¡Pago completado!', "El pago ha sido procesado con éxito", () => {
                handleConfirmationPay(paymentIntent);
            });
        } else {
            console.log("Error en el procesamiento del pago:", error);
            createAlert('error', 'Error al procesar el pago', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || !elements} className={styles.button}>
                Pagar
            </button>
        </form>
    );
};

export default PaymentForm;
