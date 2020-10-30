import express from 'express'
const router = express.Router()
import {protect, admin} from '../middleware/authMiddleware.js'
import { updateOrderToPayOnDelivery, updateOrderToDelivered, addOrderItems, getOrders, getOrderById, updateOrderToPaid, getMyOrders} from '../controlers/orderController.js'

router.route('/')
.post(protect, addOrderItems)
.get(protect, admin, getOrders)
router.route('/myorders')
.get(protect, getMyOrders)
router.route('/:id')
.get(protect, getOrderById)
router.route('/:id/pay')
.put(protect, updateOrderToPaid)
router.route('/:id/payondelivery')
.put(protect, updateOrderToPayOnDelivery)
router.route('/:id/deliver')
.put(protect, admin, updateOrderToDelivered)


export default router