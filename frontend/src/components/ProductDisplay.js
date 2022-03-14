import React from 'react'
import productContext from '../contexts/productContext/productContext';
import {useContext, useEffect} from 'react';
import AllProducts from './AllProducts';
import {useNavigate} from 'react-router-dom';

function ProductDisplay() {
    const navigate = useNavigate();
    const context = useContext(productContext);
    const {getProducts, pro} = context;

    useEffect(async () => {
      await getProducts();
    }, [])
    
    useEffect(()=>{
        if(pro !== null)
        {
            navigate('/product');
        }
    },[pro])
    return (
        <div>
            
        </div>
    )
}

export default ProductDisplay
