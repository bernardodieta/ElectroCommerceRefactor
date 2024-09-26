'use client';  // Este componente es un Client Component

import { useEffect, useState } from 'react';
import AxiosClient from '@/services/axiosClient';
import ProductById from '../../components/products/ProductById';

const ClientProductPage = ({ id }) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await AxiosClient.getRequest({
                url: `http://localhost:8080/api/products/${id}`,
            });
            // console.log('response', response);
            
            setProducts(response.data);
        };

        if (id) {
            fetchProductData();
        }
    }, [id]); 

    if (!products) {
        return <div>Loading...</div>; 
    }

    return <ProductById id={id} />;
};

export default ClientProductPage;
