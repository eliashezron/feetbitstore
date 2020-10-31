import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button,} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckouSteps'
import {saveShippingAddress} from '../actions/cartActions'


const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {deliveryAddress} = cart

    const [address, setAddress] = useState(deliveryAddress.address)
    const [town, setTown] = useState(deliveryAddress.town)
    const [telephoneNumber, setTelephoneNumber] = useState(deliveryAddress.telephoneNumber)
   

    const dispatch = useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, town, telephoneNumber}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>delivery Address</h1>
            <Form onSubmit = {submitHandler}>
            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    required
                    onChange={(e)=> setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='town'>
                    <Form.Label>Town</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter town'
                    value={town}
                    required
                    onChange={(e)=> setTown(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='telephoneNumber'>
                    <Form.Label>telephoneNumber</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter telephoneNumber'
                    value={telephoneNumber}
                    required
                    onChange={(e)=> setTelephoneNumber(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
