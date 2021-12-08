export const getItem = () => {
    return new Promise((resolve, reject) => {
        const cart = window.localStorage.getItem('cart');
        resolve(JSON.parse(cart));
    })
}

export const storeItem = (cart) => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
}