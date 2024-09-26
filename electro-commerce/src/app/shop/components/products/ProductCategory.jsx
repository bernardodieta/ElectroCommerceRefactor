'use client'
import React, { useEffect } from 'react'
import { ProductCard } from "./ProductCard.jsx";
import stylesCat from './css/productoCategory.module.css'
import { useState } from 'react';
export const ProductCategory = ({ category, products }) => {
    const [cproducts, setProducts] = useState([]);

    useEffect(() => {
        setProducts(products);
        console.log('products', products);

    }, [products]);
    return (
        <div className={stylesCat.categoryContainer}>
            <div className={stylesCat.categoryTitle}>
                <div className={stylesCat.barraTitle}></div>
                <h2>Lo Nuevo en {category}</h2>
            </div>
            <div className={stylesCat.productGridContainer}>
                {cproducts?.length > 0 ? (
                    cproducts?.map(product => (
                        <ProductCard product={product} key={product._id} />
                    ))
                ) : (
                    <p>No hay productos disponibles en esta categoría.</p>
                )}
            </div>
        </div>
    )
}
