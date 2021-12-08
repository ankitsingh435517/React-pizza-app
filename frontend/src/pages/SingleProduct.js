import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CartContext } from '../CartContext';

const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        fetch(`/product/show/${params.id}`)
        .then(res => res.json())
        .then(data => {
            setProduct(data.product);
        })
    },[]);
    
    const getSize = (productSize) => {
        if(productSize === 'S'){
            return 'small';
        }else if(productSize === 'M'){
            return 'medium';
        }else {
            return 'large';
        }
    }
    
    const { cart, setCart } = useContext(CartContext);

    const [isAdding, setisAdding] = useState(false);

    const addToCart = (productId) => {
        const _cart = {...cart};

        if(!_cart.items){
            _cart.items = {}
        }

        if(!_cart.items[productId]){
            _cart.items[productId] = 1;
        }else{
            _cart.items[productId] += 1;
        }

        if(!_cart.totalItems){
            _cart.totalItems = 0;
        }

        _cart.totalItems += 1;
        setCart(_cart);
        setisAdding(true);
        setTimeout(() => {
            setisAdding(false);
        }, 1000);
    } 

    return (
        <div className="container mx-auto w-2/3 pt-16">
            <button onClick={() => { history.goBack() }} className="font-bold">Back</button>
            <div className="mt-8 flex">
                <img style={{ height: '190px' }} src={ product.image } alt="pizza" />
                <div className="mt-4 mx-8">
                    <h1 className="font-bold">{ product.name }</h1>
                    <span className="bg-gray-200 px-2 rounded-full">{ getSize(product.size) }</span>
                    <h6 className="mt-2 font-semibold">₹{ product.price }</h6>
                    <button disabled={isAdding} onClick={ () => { addToCart(product._id) } } className={`${isAdding ? 'bg-green-500' : 'bg-yellow-500 hover:bg-yellow-600'} px-4 py-1 my-4 rounded-full text-white font-semibold`}>{ isAdding ? 'Added to cart' : 'Add to cart'}</button>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
