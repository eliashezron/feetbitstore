import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Col, Row, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'


const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [telephoneNumber, setTelephoneNumber]=useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
  
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1]:'/';

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

     const submithandler = (e) =>{
         e.preventDefault()
         if(password !== confirmpassword){
             setMessage('Passwords do not match')
         }else{
             dispatch(register(name, email, telephoneNumber, password))
         }
        
     }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                <Form.Group controlId='telephoneNumber'>
                    <Form.Label>telephoneNumber</Form.Label>
                    <Form.Control
                    type='telephoneNumber'
                    placeholder='Enter telephoneNumber'
                    value={telephoneNumber}
                    onChange={(e)=> setTelephoneNumber(e.target.value)}>

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
                        Register
                    </Button>
                
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                     <Link to= {redirect ? `/login?redirect=${redirect}`:'/login'}
                     > Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
   
}

export default RegisterScreen
