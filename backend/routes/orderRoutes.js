import express from 'express'
const router = express.Router()
import {protect, admin} from '../middleware/authMiddleware.js'
import { updateOrderToPayOnDelivery, updateOrderToDelivered, addOrderItems, getOrders, getOrderById, deleteOrder,
    // updateOrderToPaid, 
    getMyOrders} from '../controlers/orderController.js'
    import { reduceCountInStock } from '../middleware/productMiddleware.js'

router.route('/')
.post(protect, reduceCountInStock, addOrderItems)
.get(protect, admin, getOrders)
router.route('/myorders')
.get(protect, getMyOrders)
router.route('/:id')
.get(protect, getOrderById)
.delete(protect, admin, deleteOrder)
// router.route('/:id/pay')
// .put(protect, updateOrderToPaid)
router.route('/:id/payondelivery')
.put( updateOrderToPayOnDelivery)
router.route('/:id/deliver')
.put(protect, admin, updateOrderToDelivered)


export default router