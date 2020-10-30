import React, { useEffect}from 'react'
// import axios from 'axios'
// import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails,payOrderOnDelivery, deliveredOrder} from '../actions/orderActions'
import {
    
    ORDER_DELIVERED_RESET, ORDER_DETAILS_RESET, ORDER_PAY_ON_DELIVERY_RESET} from '../constants/orderConstants'

const OrderScreen = ({match, history}) => {
    const orderId = match.params.id

    // const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    
    const orderDetails = useSelector((state)=> state.orderDetails)
    const { order, loading, error } = orderDetails

//     const orderPay = useSelector((state) => state.orderPay)
//   const { loading: loadingPay, success: successPay } = orderPay

const orderPayOnDelivery = useSelector((state)=> state.orderPayOnDelivery)
const { loading:loadingPayOnDelivery, success:successPayOnDelivery,  } = orderPayOnDelivery

    const orderDelivered = useSelector((state)=> state.orderDelivered)
    const { loading:loadingDelivered, success:successDelivered,  } = orderDelivered

    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

    if(!loading){
        // calculate prices

    const addDecimals = (num) =>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(order.orderItems.reduce(
        (acc, item) => acc + item.price* item.qty, 0)
)
    }
    
    

       useEffect(()=>{
            if (!userInfo) {
                history.push('/login')
            }
        
            // const addPayPalScript = async()=>{
            //     const {data: clientId} = await axios.get('/api/config/paypal')
            //     const script = document.createElement('script')
            //     script.type = 'text/javascript'
            //     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            //     script.asyn = true
            //     script.onload = () =>{
            //         setSdkReady(true)
            //     }
            //     document.body.appendChild(script)
            // }
            
            if(!order ||successPayOnDelivery ||successDelivered||order._id !== orderId){
                dispatch({type:ORDER_DETAILS_RESET})
                dispatch({type: ORDER_PAY_ON_DELIVERY_RESET})
                dispatch({type: ORDER_DELIVERED_RESET})
                dispatch(getOrderDetails(orderId))
            }
            // else if(!order.isPaid){
            //     if(!window.paypal){
            //         addPayPalScript()
            //     }else{
            //         setSdkReady(true)
            //     }
            // }
           }
       , [dispatch, history, userInfo, order,successPayOnDelivery ,successDelivered, orderId])

    //    const successPaymentHandler  = (paymentResult)=>{
    //        console.log(paymentResult)
    //        dispatch(payOrder(orderId, paymentResult))
    //    }

       const deliverHandler=()=>{
           dispatch(deliveredOrder(order._id))
       }
       const payOnDeliveryHandler=()=>{
        dispatch(payOrderOnDelivery(orderId))
           console.log('payOnDelivery')
           
       }
   
    return (
        loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
        :<>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p><strong>Email:</strong>
                            <a href={`mailto=${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong> Address </strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city}{''},
                                {order.shippingAddress.postalCode}{''},
                                {order.shippingAddress.country},
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>:
                            <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p><h2>PaymentMethod</h2>
                            <strong>Method:</strong>
                            {order.paymentMethod}</p>
                            {/* {order.isPaid ? (<Message variant='success'>paid on {order.paidAt}</Message>):
                            (<Message variant='danger'>Not paid</Message>)} */}
                            {order.payOrderOnDelivery ? (
                <Message variant='success'>To Be Paid on Delivery {order.placed}</Message>
              ) : (
                <Message variant='danger'>Order Not yet Placed</Message>
              )}
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item)=>(
                                        <ListGroup.Item key={item.product._id}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name}
                                                    fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to = {`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty}*UGX{item.price}=UGX{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>UGX{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>UGX{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>UGX{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>UGX{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? (<Loader/>):(
                                        <PayPalButton
                                        amount = {order.totalPrice}
                                        onSuccess={successPaymentHandler}/>
                                    )}
                                </ListGroup.Item>
                            )} */}
                            {!order.payOrderOnDelivery && (
                                <ListGroup.Item>
                                {loadingPayOnDelivery ? <loader/> :
                                ( <Button type='Button' className='btn-block'
                                    
                                    onClick={payOnDeliveryHandler}>
                                        PayOnDelivery
                                    </Button>)}
                                   
                                </ListGroup.Item>
                            )}
                            {loadingDelivered && <Loader/>}
                           {userInfo && userInfo.isAdmin && order.payOrderOnDelivery && !order.isDelivered && (
                               <ListGroup.Item>
                                   <Button type='button' className='btn btn-block'
                                   onClick={deliverHandler}>
                                       Mark As Delivered
                                   </Button>
                               </ListGroup.Item>
                           )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen
