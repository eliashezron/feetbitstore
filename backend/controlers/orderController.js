import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// description create new order
// route post/api/products
// access private
const addOrderItems = asyncHandler(async(req, res)=>{
    const { orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice}= req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        return
    }else{
        const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
        })

        const createdOrder =  await order.save()

        res.status(201).json(createdOrder)
    }
})

// description get order by ID
// route post/api/orders/:id
// access private
const getOrderById = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('order not found')
    }
})




//description update order to paid
// route post/api/orders/:id/pay
// access private
// const updateOrderToPaid = asyncHandler(async(req, res)=>{
//     const order = await Order.findById(req.params.id)

//     if(order){
//         order.isPaid = true
//         order.paidAt = Date.now()
//         order.paymentResult = {
//             id: req.body.id,
//             status: req.body.status,
//             update_time: req.body.update_time,
//             email_address: req.body.payer.email_address
//         }

//         const updatedOrder= await order.save()

//         res.json(updatedOrder)
//     }else{
//         res.status(404)
//         throw new Error('payment failed')
//     }
// })

//description update order to paid
// route post/api/orders/:id/pay
// access private
const updateOrderToPayOnDelivery = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.payOnDelivery = true
        order.placedAt = Date.now()
        
        const updatedOrder= await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('request failed')
    }
})

//desc get logged in user orders
// route post/api/orders/myorders
// access private
const getMyOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id})

    res.json(orders)
   
})

//desc all orders
// route post/api/orders
// access private
const getOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({}).populate('user', 'id name')


    res.json(orders)
   
})


//description update order to delivered
// route post/api/orders/:id/deliver
// access private admin
const updateOrderToDelivered = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
       
        const updatedOrder= await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('order not found')
    }
})


export {addOrderItems, getOrderById,
    updateOrderToPayOnDelivery, getOrders, getMyOrders, updateOrderToDelivered}