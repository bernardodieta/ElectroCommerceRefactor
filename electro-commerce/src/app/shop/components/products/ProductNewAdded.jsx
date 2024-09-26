'use client'
import AxiosClient from '@/services/axiosClient';
import React, { useEffect, useState } from 'react'
import { ProductCard } from "./ProductCard";

import stylesCat from './css/productoCategory.module.css'

export const ProductNewAdded = ({ startDate }) => {
    const [productCategoryList, setProductCategoryList] = useState([])

    useEffect(() => {
        const fetchProductCategory = async () => {
            let url = `/api/products?startDate=${startDate}&limit=8`
            const result = await AxiosClient.getRequest({ url })
            console.log(result.data.payload);
            setProductCategoryList(result.data.payload.data)
        }
        fetchProductCategory()
    }, [])

    return (

        <div className={stylesCat.categoryContainer}>
            <div className={stylesCat.categoryTitle}>
                <div className={stylesCat.barraTitle}></div>
                <h2>Agregado Recientemente</h2>
            </div>
            <div className={stylesCat.productGridContainer}>

                {productCategoryList.map(product => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>
        </div>
    )
}
