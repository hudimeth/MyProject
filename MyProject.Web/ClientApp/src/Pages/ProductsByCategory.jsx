import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryNameSidebar from '../Components/CategoryNamesSidebar';
import { useParams } from 'react-router-dom';
import ProductInList from '../Components/ProductInList';

const ProductsByCategory = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const { data } = await axios.get(`/api/products/bycategory?categoryid=${categoryId}`);
            setProducts(data);
        }
        loadProducts();
    },[categoryId])

    return (
        <div className='container g-0'>
            <div className='row'>
                <div className='col-2'>
                    <CategoryNameSidebar />
                </div>
                <div className='col-8'>
                    {products.map(p => <ProductInList key={p.id} product={p} />)}
                </div>
            </div>

        </div>
    )
}

export default ProductsByCategory;