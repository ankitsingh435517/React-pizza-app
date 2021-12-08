import React, { useContext } from 'react'
import { Products } from '../components';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const { cart } = useContext(CartContext);

    const handleOrderNow = () => {
         if(cart && cart.totalItems > 0){
             return '/cart';
         }
         return '/products';
    }
    return (
        <>
            <div style={{ background: '#F59E0D', width:'99%' , height: '410px' }} className="rounded-full ml-2">
                <div className="container flex items-center justify-between">
                    <div className="">
                        <img style={{ height:'410px' }}  src="/images/hero-pizza.png" alt="pizza" />
                    </div>
                    <div>
                        <h6 className="text-xl ml-2"><em>Are you hungry ?</em></h6>
                        <h1 className="py-2 mb-2 font-bold text-3xl md:text-6xl">Don't wait !</h1>
                        <Link to={ handleOrderNow() }>
                        <button className="hover:bg-red-700 bg-red-600 px-4 py-1 rounded-full text-white font-bold">Order now</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <Products />
            </div>
        </>
    )
}

export default Home
