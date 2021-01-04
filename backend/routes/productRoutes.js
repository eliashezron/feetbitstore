import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'
import{ getProducts,
    getProductById, 
    deleteProduct, 
updateProduct, createProductReview,
createProduct,
getTopProducts}from '../controlers/productContoller.js'
import {protect, admin } from '../middleware/authMiddleware.js'


router.route('/')
.get(getProducts)
.post(protect, admin, createProduct)

router.route("/:id")
.get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct)


router.route('/:id/reviews/:reviews')
.post(protect, createProductReview)
router.get('/top/:top', getTopProducts)


export default router