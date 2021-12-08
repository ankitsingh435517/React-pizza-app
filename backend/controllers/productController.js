const Product = require('../models/product');
const CustomErrorHandler = require('../services/CustomErrorHandler');

const productController = {
    async addNewProduct(req, res, next) {
        try{
            // console.log(req.body)
            const { name, size, price, image } = req.body;
            const product = await Product.create( { name, size, price, image });

            if(!product){
                return next(CustomErrorHandler.dbError());
            }

            res.status(201).json({
                success: true,
                message: 'Product added successfuly',
                product
            });

        }catch(err){
            return next(new Error(`Something went wrong: ${err.message}`))
        }
    },

    async showAllProducts(req, res, next){
        try{
            const products = await Product.find();

            res.status(200).json({
                success: true,
                message: 'All products',
                totalProducts: products.length,
                products
            });

        }catch(err){
            return next(new Error(`Something went wrong: ${err.message}`));
        }
    },

    async getSingleProduct(req, res, next){
        try{
            const product = await Product.findOne({ _id: req.params.id });

            if(!product){
                return next(CustomErrorHandler.dbError());
            }

            res.status(200).json({
                success: true,
                product
            });

        }catch(err){
            return next(new Error(`Something went wrong: ${err.message}`));
        }
    },

    async getCartItems(req, res, next){
        try{
            const items = await Product.find({ _id: {$in:req.body.ids}});

            res.status(200).json({
                success: true,
                message: 'All cart items',
                totalItems: items.length,
                items
            });
        }catch(err){
            return next(new Error(`Something went wrong: ${er.messge}`));
        }
    },

    async updateProduct(req, res, next){
        try{
            const product = await Product.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true});

            if(!product){
                return next(CustomErrorHandler.dbError());
            }

            res.status(200).json({
                success: true,
                message: 'Product updated successfuly',
                product
            });
        }catch(err){
            return next(new Error(`Something went wrong: ${err.message}`));
        }
    },

    async destroyProduct(req, res, next){
        try{
            const product = await Product.findByIdAndRemove({ _id: req.params.id });

            if(!Product){
                return next(CustomErrorHandler.dbError());
            }

            res.status(200).json({
                success: true,
                message: 'product deleted successfuly',
                product
            });
        }catch(err){
            return next(new Error(`Something went wrong: ${err.message}`));
        }
    }
};

module.exports = productController;