import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

const Product = (props) => {
    const { product } = props;

    const getSize = (productSize) => {
        if(productSize === 'S'){
           return 'small';
        }else if(productSize === 'M'){
           return 'medium';
        }else{
           return 'large';
        }
    }

    const { cart, setCart } = useContext(CartContext);

    const [isAdding, setisAdding] = useState(false);

    const addToCart = (event, productId) => {
        event.preventDefault();

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
                <Link to={`/products/${product._id}`}>
                    <div>
                        <div>
                            <img src={ product.image } alt="pizza" />
                        </div>
                        <div className="text-center">
                            <h1 className="font-bold">{ product.name }</h1>
                            <span className="bg-gray-200 px-2 rounded-full">{ getSize(product.size) }</span>
                        </div>
                        <div className="flex items-center justify-between my-2">
                            <span className="text-lg font-semibold">₹{product.price}</span>
                            <button disabled={isAdding} onClick={ (e) => { addToCart(e,product._id) } } className={`${isAdding ? 'bg-green-500' : 'bg-yellow-500 hover:bg-yellow-600' } px-2  rounded-full text-white font-semibold`}>{ isAdding ? 'ADDED' : 'ADD'}</button>
                        </div>
                    </div>
                </Link>
    )
}

export default Product
