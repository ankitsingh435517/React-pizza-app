import React, { useState, useEffect } from 'react'
import { Product } from '../components';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/products/index')
        .then(res => res.json())
        .then(data => {
            setProducts(data.products);
        })
    },[])
    
    return (
        <div className="container mx-auto py-8">
            <h1 className="font-bold text-lg">Products</h1>
            <div className="grid grid-cols-5 gap-24 my-6">

              {
                  products.map(product => <Product key={product._id} product={product} />)
              }
                
            </div>
        </div>
    )
}

export default Products
