'use client'
import React from 'react'
import Rating from '@mui/material/Rating';
import styles from './css/productCard.module.css'
import { roboto } from '@/config/fonts/fonts';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export const ProductCard = ({ product }) => {
    const router = useRouter();
    const addToCart = useCartStore(state => state.addToCart);

    const handleProductById = (id) => {
        router.push(`/shop/product/${id}`);
    }

    const handleAddToCart = (event) => {
        event.stopPropagation();
        console.log('Producto agregado al carrito:', product.title);
        addToCart(product, 1);
    }

    const imagePath = product.img?.[0]?.path ? product.img[0].path.replace(/\\/g, '/') : 'default-image.jpg';

    return (
        <div className={styles.cardContainer} onClick={() => handleProductById(product._id)}>
            <div className={styles.ratingContainer}>
                <Rating name="half-rating-read" defaultValue={4} precision={0.5} readOnly className={styles.rating} />
            </div>
            <img src={`/images/${imagePath}`} className={styles.cardImg} alt={product.title} />
            <h3 className={roboto.className}>{product.title.toString().substring(0, 25)}</h3>
            <h4>24 Meses sin intereses...</h4>
            <h3 className={styles.price}>$ {product.price}</h3>
            <h4 className={styles.meses}>Entrega Gratis</h4>
            <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
    );
}
