import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInList from './ProductInList';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const { data } = await axios.get('/api/products/allproducts');
            setProducts(data);
        }
        loadProducts();
    }, []);

    return (
        <div>
            {products.map(p => <ProductInList key={p.id} product={p} />) }
        </div>
    )
}
export default Products;