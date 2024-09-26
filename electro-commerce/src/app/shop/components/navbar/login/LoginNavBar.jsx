'use client'
import { useState, useEffect, useRef } from "react";

import { CiUser } from "react-icons/ci";
import Link from 'next/link';
import { roboto } from "@/config/fonts/fonts";
import { useUsersStore } from "@/store/userStore";
import AxiosClient from "@/services/axiosClient";
import { useRouter } from "next/navigation";
import styles from './css/loginNav.module.css'


export const LoginNavbar = () => {
    const usersStore = useUsersStore();
    const user = usersStore.user;
    const isAuthenticated = usersStore.isAuthenticated;

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const handleDropMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        const url = '/api/users/logout';
        const result = await AxiosClient.postRequest({ url });
        if (result) {
            usersStore.clearUser();
            router.push('/');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.containerLoginNavBar} onClick={handleDropMenu}>
            {isAuthenticated ? (
                <>
                    <button className={`${styles.btnUsuarioNav} ${roboto.className}`}>
                        {user?.firstName || "Usuario"}
                    </button>
                    <CiUser size={34} />
                </>
            ) : (
                <>
                    <button className={`${styles.btnUsuarioNav} ${roboto.className}`}>Iniciar sesión</button>
                    <CiUser size={34} />
                </>
            )}

            <div
                ref={menuRef}
                className={`${styles.dropMenuLogin} ${isOpen ? styles.open : styles.closed} ${roboto.className}`}
            >
                {isAuthenticated && user?.role === 'admin' && (
                    <Link href="/admin/adminMenu/" passHref>
                        <button>Menú Administrador</button>
                    </Link>
                )}
                {isAuthenticated ? (
                    <>
                        <Link href={'/auth/profile'}>
                            <button>Mi Perfil</button>
                        </Link>
                        <Link href={'/auth/userOrders'} query={{ userId: user?._id }}>
                            <button>Mi Compras</button>
                        </Link>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link href={'/shop/users/login'}>
                            <button>Iniciar Sesión</button>
                        </Link>
                        <Link href={'/shop/users/register/'}>
                            <button>Registrarme</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};
