import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Table, Col, Row, Button} from 'react-bootstrap'
import{LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'



const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
   
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
  
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user} = userDetails
    


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders, orders} = orderListMy

    
    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
               
            }else{
                 setName(user.name)
                 setEmail(user.email)
            }

        }
    }, [dispatch, history, userInfo, user])

     const submithandler = (e) =>{
         e.preventDefault()
         if(password !== confirmpassword){
             setMessage('Passwords do not match')
         }else{
            dispatch(updateUserProfile({id:user._id, name, email, password}))
         }
        
     }
    return <Row>
        <Col md={3}>
        <h2>Sign Up</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submithandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
              
                <Form.Group controlId='password'>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmpassword'>
                    <Form.Label>confirmpassword</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='confirmpassword'
                    value={confirmpassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                    
                    <Button type='submit'
                    variant='primary'>
                        Update
                    </Button>
                
            </Form>

        </Col>
        <Col md={9}>
            <h2>my orders</h2>
            {loadingOrders ? (<Loader/> ): errorOrders ? ( <Message variant='danger'>{errorOrders}</Message>)
            :(<Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAY ON DELIVERY</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>UGX{order.totalPrice}</td>
                            <td>{order.payOnDelivery ? 
                                order.placedAt.substring(0, 10):(
                                <i className='fas fa-times' style={{color:'red'}}></i>
                            )}</td>
                            <td>{order.isDelivered ? 
                                order.deliveredAt.substring(0, 10):(
                                <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className = 'btn-sm' variant='light'>
                                    Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>)}
        </Col>
    </Row>
   
}

export default ProfileScreen
