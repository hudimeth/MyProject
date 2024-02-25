import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryNameSidebar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const { data } = await axios.get('/api/categories/allcategories');
            setCategories(data);
        }
        loadCategories();
    }, [])

    return (

        <div className='card border-top-0 border-bottom-0 border-start-0'>
            <h5 className='text-center mt-2'>Shop by category:</h5>
            {categories.map(c => <h6 key={c.id} className='text-center'>{c.name}</h6>)}
        </div>
    )
}

export default CategoryNameSidebar;