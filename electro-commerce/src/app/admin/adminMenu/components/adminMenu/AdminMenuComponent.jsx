import React from 'react'
import { FaUserCog } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import styles from './adminMenuPage.module.css'
import { MdOutlineLocalOffer } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import Link from 'next/link';
export const AdminMenuComponent = () => {
    return (
        <div className={styles.adminMenu}>
            <div className={styles.adminMenuContainer}>
                <div className={styles.adminMenuTitle}>
                    <div className={styles.barraTitle}></div>
                    <h2>Administración</h2>
                </div>
                <div className={styles.adminMenuItems}>

                    <Link href={'/admin/adminMenu/users'} passHref className={styles.link}>
                        <div className={styles.adminMenuItem}>
                            <p>Usuarios</p>
                            <FaUserCog size={34} color='#ffca0d' />
                            <p>Gestionar usuarios</p>
                        </div>
                    </Link>
                    <Link href={'/admin/adminMenu/products'} passHref className={styles.link}>
                        <div className={styles.adminMenuItem}>
                            <p>Productos</p>
                            <FaShop size={34} color='#ffca0d' />
                            <p>Gestionar productos</p>
                        </div>
                    </Link>
                    <Link href={'/admin/adminMenu/orders'} passHref className={styles.link}>
                        <div className={styles.adminMenuItem}>
                            <p>Ordenes</p>
                            <IoTicketOutline size={34} color='#ffca0d' />
                            <p>Gestionar Ordenes de compra</p>
                        </div>
                    </Link>
                    <Link href={'/admin/adminMenu/products'} passHref className={styles.link}>
                        <div className={styles.adminMenuItem}>
                            <p>Ofertas</p>
                            <MdOutlineLocalOffer size={34} color='#ffca0d' />
                            <p>Gestionar Ofertas</p>
                        </div>
                    </Link>
                    <Link href={'/admin/adminMenu/products'} passHref className={styles.link}>
                        <div className={styles.adminMenuItem}>
                            <p>Pedidos</p>
                            <IoTicketOutline size={34} color='#ffca0d' />
                            <p>Gestionar pedidos</p>
                        </div>
                    </Link>

                </div>

            </div>
        </div>
    )
}
