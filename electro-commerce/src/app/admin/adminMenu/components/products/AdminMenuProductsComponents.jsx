'use client'
import { useState, useEffect } from 'react';
import { useUsersStore } from '@/store/userStore';
import AxiosClient from '@/services/axiosClient';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './listproducto.module.css';

const ListProduct = () => {
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const user = useUsersStore((state) => state.user);
    const client = AxiosClient;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = user.role === 'PREMIUM'
                    ? `/api/products?owner=${user.email}&limit=50`
                    : `/api/products?limit=50`;

                const response = await client.getRequest({ url });
                console.log(response);

                setProducts(response.data.payload.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [user, client]);

    const handleEditProduct = (id) => {
        console.log(id);
        
        router.push(`/auth/products/${id}`)
    }
    const handleaddOfferToProduct = (id) => {
        router.push(`/admin/products/addOffer/${id}`);
    };

    const handleSelectProduct = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`, {
                withCredentials: true, // Permite el envío de cookies
            });
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedProducts.map((productId) =>
                    client.deleteRequest({
                        url: `/api/products/${productId}`,
                    })
                )
            );
            setProducts(products.filter((product) => !selectedProducts.includes(product._id)));
            setSelectedProducts([]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Product List</h1>
            {/* <div className={styles.flexEnd}>
                <button
                    className={styles.buttonDeleteSelected}
                    onClick={handleDeleteSelected}
                    disabled={selectedProducts.length === 0}
                >
                    Delete Selected
                </button>
            </div> */}
            <div className={styles.gridContainer}>
                {products.map((product) => (
                    <div key={product._id} className={styles.productCard}>
                        {/* <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => handleSelectProduct(product._id)}
                            className={styles.checkbox}
                        /> */}
                        <div className={styles.flexBetween}>

                            <Image
                                alt="Product Image"
                                src={`/images/${product.img[0].path.replace(/\\/g, '/')}`}
                                className={styles.imageContainer}
                                width={200}
                                height={200}
                            />
                            <div className={styles.textContainerBox}>
                                <h3 className={styles.productTitle}>{product.title}</h3>
                                <p className={styles.textGray}>Price: ${product.price}</p>
                                <p className={styles.textGray}>Stock: {product.stock}</p>
                            </div>


                        </div>

                        <div className={`${styles.flexBetweenBtn} ${styles.mt2}`}>
                            <button
                                className={styles.button}
                                onClick={() => handleEditProduct(product._id)}
                            >
                                Edit
                            </button>
                            <button
                                className={`${styles.button} ${styles.buttonRed}`}
                                onClick={() => handleDeleteProduct(product._id)}
                            >
                                Delete
                            </button>
                            <button
                                className={`${styles.button} ${styles.buttonOffer}`}
                                onClick={() => handleaddOfferToProduct(product._id)}
                            >
                                Agregar Oferta
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
