import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckouSteps'
import {savePaymentMethod} from '../actions/cartActions'


const PaymentScreen = ({history}) => {
    const cart = useSelector(state =>state.cart)
    const {deliveryAddress} = cart

    if(!deliveryAddress){
        history.push('/destination')
    }

    const [paymentMethod, setPaymentMethod] = useState('')
    

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit = {submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
            
            <Col>
            {/* <Form.Check 
                type='radio' 
                label='payPal'
                 id='PaymentMethod'
                name='paymentMethod'
                 value='PayPal' 
            
                 onChange={(e)=>{
                    setPaymentMethod(e.target.value)}}>
                </Form.Check> */}
                <Form.Check 
                type='radio' 
                label='Pay On Delivery'
                 id='paymentMethod'
                name='paymentMethod'
                 value='PayOnDelivery'

                 onChange={(e)=>{
                    setPaymentMethod(e.target.value)}}>
                </Form.Check>

                {/* <Form.Check 
                type='radio' 
                label='Stripe'
                 id='Stripe'
                name='paymentMethod'
                 value='Stripe' 
                 checked onChange={(e)=>{
                    setPaymentMethod(e.target.value)}}>
                </Form.Check> */}
            </Col>
            </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
