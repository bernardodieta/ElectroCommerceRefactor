// LoginMenu.js
'use client'
import { useState } from "react";
import AxiosClient from "@/services/axiosClient";
import { useUsersStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import styles from './login.module.css';
import { roboto } from "@/config/fonts/fonts.js";
import axios from "axios";

export const LoginMenu = () => {
    const router = useRouter();

    const setUserInStore = useUsersStore((state) => state.setUser);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users/login";
            const body = user;
            const config = { withCredentials: true };
            const result = await AxiosClient.postRequest({ url, body, config });
            const data = await result.data;

            if (data) {
                const initialUser = await axios.get(
                    "http://localhost:8080/api/users/",
                    { withCredentials: true }
                );
                setUserInStore(initialUser.data.payload);
                router.push('/');
            } else {
                console.log('Ocurrió un error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };



    return (
        <div className={`${roboto.className} ${styles.loginMainContainer}`}>
            <form onSubmit={handleLoginSubmit} className={styles.loginFormContainer}>
                <div className={styles.formLoginBox}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} value={user.email} />

                </div>

                <div className={styles.formLoginBox}>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="password" placeholder="Contraseña" onChange={handleChange} value={user.password} />
                </div>
                <button className={styles.formLogiBTN}>Ingresar</button>
                <Link href="/shop/users/register" passHref className={styles.btnGoogleC}>
                    <FaGoogle />
                    <button className={styles.btnGoogle}> Ingresa con Google </button>
                </Link>
            </form>
            <div className={styles.registerContainer}>
                <h2>¿No tienes cuenta?</h2>
                <Link href="/shop/users/register" passHref>

                    <button className={styles.btnRegister}>Regístrate</button>
                </Link>

            </div>

        </div>
    )
}