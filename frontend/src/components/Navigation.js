import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

const Navigation = () => {
    const { cart } = useContext(CartContext);

    return (
        <div className="container mx-auto py-5 flex items-center justify-between">
            <Link to="/"><img style={{ height: '45px' }} src="/images/logo.png" alt="pizza logo" /></Link>
            <ul className="flex items-center">
                <li className="font-semibold hover:text-gray-600"><Link to="/">Home</Link></li>
                <li className="ml-6 font-semibold hover:text-gray-600"><Link to="/products">Products</Link></li>
                <li className="ml-6 font-semibold hover:text-gray-600"><Link to="/signup">Sign up</Link></li>
                <li className="ml-6">
                    <Link to="/cart">
                        <div className="flex items-center bg-yellow-500 px-2 py-1 rounded-full">
                            <span className="mr-2 font-semibold">{ cart.totalItems ? cart.totalItems : 0 }</span>
                            <img src="/images/cart.png" alt="cart" />
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation
