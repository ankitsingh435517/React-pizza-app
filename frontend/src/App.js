import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Navigation, Products } from './components';
import { Home, SingleProduct, Cart, SignUp, SignIn } from './pages';
import { CartContext } from './CartContext';
import { getItem, storeItem } from './Helper';

const App = () => {
    const[cart, setCart] = useState({});

    useEffect(() => {
        getItem().then(cart => {
            setCart(cart);
        })
    }, []);

    useEffect(() => {
        storeItem(cart);
    },[cart]);

    return (
        <>
           <Router>
               <CartContext.Provider value={{ cart, setCart }}>    
                    <Navigation />
                    <Switch>
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/products" exact component={Products}></Route>
                        <Route path="/products/:id" component={SingleProduct}></Route>
                        <Route path="/cart" component={Cart}></Route>
                        <Route path="/signup" component={SignUp}></Route>
                        <Route path="/signin" component={SignIn}></Route>
                    </Switch>
               </CartContext.Provider>
           </Router>  
        </>
    )
}

export default App
