import React, { useState, useEffect } from 'react';
import styles from './AdminOrders.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const OrderListAdmin = ({ orders }) => {
    const [updatedOrders, setUpdatedOrders] = useState(orders);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        setUpdatedOrders(orders);
    }, [orders]);

    const updateOrderStatus = async (orderId) => {
        try {
            const res = await axios.put(`/api/orders/delivery-status/${orderId}`, {
                newStatus,
            });
            if (res.status === 200) {
                toast.success('Estado de entrega actualizado');
    
                setUpdatedOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, deliverystatus: newStatus } : order
                    )
                );
            }
        } catch (error) {
            toast.error('Error al actualizar el estado');
        }
    };
    
    const deleteOrder = async (orderId) => {
        try {
            const res = await axios.delete(`/api/orders/delete/${orderId}`);
            if (res.status === 200) {
                toast.success('Orden eliminada');
    
                setUpdatedOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            }
        } catch (error) {
            toast.error('Error al eliminar la orden');
        }
    };
    

    return (
        <div className={styles.ordersContainer}>
            {updatedOrders.length > 0 ? (
                updatedOrders.map((order) => (
                    <div key={order._id} className={styles.order}>

                        <div className={styles.orderColumDetail}>
                            {order.products.map((productItem) => (
                                <div key={productItem._id} className={styles.productItem}>
                                    <h3>{productItem.product.title}</h3>

                                    <div className={styles.productDetail}>
                                        <span className={styles.label}>Cantidad:</span>
                                        <span className={styles.value}>{productItem.quantity}</span>
                                    </div>
                                    <div>
                                        <img
                                            src={`/images/${productItem.product.img[0].path}`}
                                            alt={productItem.product.title}
                                            className={styles.productImage}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {order.paymentProcess?.status === 'Completado' && order.deliverystatus === 'Entregada' ? (
                            <p>Este pedido ya fue entregado.</p>
                        ) : (
                            <div className={styles.orderDetailStatus}>
                                <label htmlFor="status">Actualizar estado de entrega:</label>
                                <select
                                    id="status"
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className={styles.btnselectOption}
                                >
                                    <option value="">Selecciona un estado</option>
                                    <option value="En camino">En camino</option>
                                    <option value="Entregada">Entregada</option>
                                    <option value="Cancelada">Cancelada</option>
                                </select>
                                <button onClick={() => updateOrderStatus(order._id)} className={styles.btnActEstado}>
                                    Actualizar estado
                                </button>
                            </div>
                        )}
                        <div className={styles.columDetail}>
                            <div className={styles.orderColumDetail}>
                                <div className={styles.orderDetail}>
                                    <span className={styles.label}>Total Pagado: </span>
                                    <span className={styles.value}>${order.total}</span>
                                </div>
                                <div className={styles.orderDetail}>
                                    <span className={styles.label}>Fecha de compra:</span>
                                    <span className={styles.value}>{new Date(order.date).toLocaleString()}</span>
                                </div>
                                <div className={styles.orderDetail}>
                                    <span className={styles.label}>Estado de entrega:</span>
                                    <span className={styles.value}>{order.deliverystatus}</span>
                                </div>
                            </div>
                            <div className={styles.orderColumDetail}>
                                <div className={styles.orderDetail}>
                                    <span className={styles.label}>Proceso de pago:</span>
                                    {order.paymentProcess?.status === 'Completado' ? (
                                        <span className={styles.valueGreen}>Pago exitoso</span>
                                    ) : (
                                        <span className={styles.valueRed}>Pago pendiente</span>
                                    )}
                                </div>
                                <div className={styles.orderDetail}>
                                    <span className={styles.label}>Dirección de envío:</span>
                                    <span className={styles.value}>{order.address[0]?.addressText} {order.address[0]?.numext}</span>
                                </div>
                                <div className={styles.orderDetail}>
                                    <span className={styles.label}>Ciudad y Código Postal:</span>
                                    <span className={styles.value}>{order.address[0]?.city} {order.address[0]?.zipcode}</span>
                                </div>
                            </div>
                            <button className={styles.btnBorrarOrden} onClick={() => deleteOrder(order._id)}>
                                Borrar Orden
                            </button>

                        </div>
                    </div>
                ))
            ) : (
                <p>No hay órdenes disponibles.</p>
            )}
                    <ToastContainer />
        </div>
    );
};
