const router = require('express').Router();
const  productController  = require('../controllers/productController');

router.post('/product/new', productController.addNewProduct);

router.get('/products/index', productController.showAllProducts);

router.get('/product/show/:id', productController.getSingleProduct);

router.post('/products/cart-items', productController.getCartItems);

router.put('/product/update/:id', productController.updateProduct);

router.delete('/product/delete/:id', productController.destroyProduct);

module.exports = router;
