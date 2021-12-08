import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext';

const Cart = () => {
    let grandTotal = 0;

    const { cart, setCart } = useContext(CartContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(!cart.items){
            return;
        }
        fetch('/products/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: Object.keys(cart.items) })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setProducts(data.items);
        })
    },[cart]);

    const getTotalPrice = (productId, productPrice) => {
        const sum = cart.items[productId] * productPrice;
        grandTotal += sum;
        return sum;
    }

    const decrement = (productId) => {
        const qty = cart.items[productId];
        if(qty === 1){
            return;
        }
        const _cart = {...cart};
        _cart.items[productId] -= 1;
        _cart.totalItems -= 1;
        setCart(_cart); 
    }

    const increment = (productId) => {
        const _cart = {...cart};
        _cart.items[productId] += 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }

    const deleteItem = (productId) => {
        const _cart = {...cart};
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        const remainingProducts = products.filter(product => product._id !== productId);
        _cart.totalItems -= qty;
        setCart(_cart);
        setProducts(remainingProducts);
    }

    const handleOrderNow = () => {
        window.alert('Order placed');
        setCart({});
        setProducts([]);
    }

    return (
        products.length ? 
        <div className="container mx-auto lg:w-1/2 w-full pb-24">
            <h1 className="font-bold my-12">Cart Items</h1>
            <ul>
                {
                    products.map(product => {
                        return (<React.Fragment key={product._id}>
                        <li className="mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src={ product.image } style={{ height: '70px'}} alt="pizaa" />
                                    <h1 className="ml-6 font-bold w-28">{ product.name }</h1>
                                </div>
                                <div>
                                    <button onClick={ () => { decrement(product._id) } } className="bg-yellow-500 hover:bg-yellow-600 px-3 rounded-full text-white font-bold">-</button>
                                    <b className="font-bold mx-4">{ cart.items[product._id]}</b>
                                    <button onClick={ () => { increment(product._id) } } className="bg-yellow-500 hover:bg-yellow-600 px-3 rounded-full text-white font-bold">+</button>
                                </div>
                                <span className="font-semibold text-lg">₹{ getTotalPrice(product._id, product.price) }</span>
                                <div>
                                <button onClick={ () => { deleteItem(product._id) } } className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full text-white font-semibold">Delete</button>
                                </div>
                            </div>
                
                        </li>
                        </React.Fragment>)
                    })
                }
                
            </ul>
            <hr className="py-4" />
            <div className="text-right">
                <span className="font-semibold text-xl">Grand total: </span>
                <span className="text-lg">${ grandTotal }</span>
            </div>
            <div className="text-right pt-6">
                <button onClick={ () => { handleOrderNow() } } className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded-full text-white font-semibold">Order Now</button>
            </div>
        </div> 
        : <img src="/images/empty-cart.png" alt="empty cart"/>
    )
}

export default Cart
