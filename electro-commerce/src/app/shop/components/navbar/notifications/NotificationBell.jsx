import { useState, useEffect, useRef } from 'react';
import useNotificationStore from '@/store/notificationStore';
import { useUsersStore } from '@/store/userStore';
import { FaRegBell } from 'react-icons/fa6';
import styles from './NotificationBell.module.css'
import { roboto } from '@/config/fonts/fonts';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const loadUser = useUsersStore((state) => state.user);
    const fetchNotifications = useNotificationStore((state) => state.fetchNotifications);
    const notifications = useNotificationStore((state) => state.notifications); // Asegúrate de traer el estado correctamente
    const markAsRead = useNotificationStore((state) => state.markAsRead);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (loadUser?._id) {
            console.log("User loaded:", loadUser);  // Verifica si el usuario se carga correctamente
            fetchNotifications(loadUser._id)
                .then(() => {
                    console.log("Notifications fetched successfully");
                })
                .catch((error) => {
                    console.error("Error al cargar las notificaciones:", error);
                });
        } else {
            console.log("No user ID found");
        }
    }, [loadUser?._id]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleMarkAsRead = (_id) => {
        try {
            markAsRead(_id);
            console.log(`Notification ${_id} marked as read.`);
        } catch (error) {
            console.error(`Error al marcar la notificación ${_id} como leída:`, error);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    console.log("Notifications state:", notifications); // Verifica el estado de las notificaciones

    return (
        <div className={styles.container} ref={dropdownRef}>
            <p className={`${styles.btnFavorites} ${roboto.className}`}>Notificaciones</p>
            <button
                onClick={toggleDropdown}
                className={styles.bellButton}
            >
                <FaRegBell size={18} />
                {notifications.length > 0 && (
                    <span className={styles.notificationBadge}>
                        {notifications.length}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className={styles.dropdown}>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={styles.notificationItem}
                            >
                                <p>{notification.message}</p>
                                <button
                                    onClick={() => handleMarkAsRead(notification._id)}
                                    className={styles.markAsReadButton}
                                >
                                    Marcar como leída
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className={styles.notificationItem}>
                            No hay notificaciones
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
