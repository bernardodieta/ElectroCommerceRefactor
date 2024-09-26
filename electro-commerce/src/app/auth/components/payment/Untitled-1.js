


import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createAlert, createAlertWithCallback } from '../../../../utils/alerts.js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            console.error("Stripe o los elementos no están listos.");
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });

        if (!error) {
            
            createAlertWithCallback('success', '¡Pago completado!', "El pago ha sido procesado con éxito", () => {
               
                window.location.replace('/');
            });
        } else {
            console.log("Error en el procesamiento del pago:", error);
            createAlert('error', 'Error al procesar el pago', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="mt-4">
                <button
                    type="submit"
                    disabled={!stripe || !elements}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                    Pagar
                </button>
            </div>
        </form>
    );
};

export default PaymentForm;