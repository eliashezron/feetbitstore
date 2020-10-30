import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Table,Button} from 'react-bootstrap'
import{LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listAllOrders, deleteOrder} from '../actions/orderActions'

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderListAll = useSelector(state => state.orderListAll)
    const {loading, error, orders}= orderListAll

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}= userLogin

    const orderDelete = useSelector(state => state.orderDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete}= orderDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listAllOrders())
        }else{
            history.push('/login')
        }
        
  
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler=(id)=>{
      if(window.confirm('Are you Sure')){
          dispatch(deleteOrder(id))
      }
      }



    
    return (
        <>
           <h1>Orders</h1> 
           {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
           {loading ? <Loader/> : error ? <Message variant = 'danger'>{error}</Message>
           :(
               <Table striped bordered hover responsive className='table-sm'>
               
                   <thead>
                       <tr>
                           <th>ID</th>
                           <th>USER</th>
                           <th>DATE</th>
                           <th>TOTALPRICE</th>
                           <th>PAID</th>
                           <th>DELIVERED</th>
                       </tr>
                   </thead>
                   <tbody>
                   {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>UGX{order.totalPrice}</td>
                <td>
                  {order.payOrderOnDelivery ? (
                    order.placedAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                  <Button variant ='danger' className='btn-sm' onClick={()=>
                  deleteHandler(order._id)}>
                      <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
                   </tbody>
                   
               </Table>
           ) }
        </>
    )
}

export default OrderListScreen
