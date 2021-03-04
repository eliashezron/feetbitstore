import React from 'react'
import {Link} from  'react-router-dom'
import {Card, CardDeck} from 'react-bootstrap'
import Rating from './Rating'
import './Product.css'
// my-3 p-3 rounded
const Product = ({product}) => {
    return (
      <CardDeck>
        <Card border="none" >
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>
  
        {/* <Card.Body> 
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
  
          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          className='my-3 p-3 rounded'
          <Card.Text as='h8'>UGX<strong>{product.price}</strong></Card.Text>
        </Card.Body> */}
      </Card>
      </CardDeck>
    )
}

export default Product
