import React from 'react'
import {Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {logout} from '../actions/userActions.js'
import './header.css'
  const Header = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const logoutHandler= () =>{
    dispatch(logout())
  }
  
    return ( <
        header className='header-main' >
        <>
        <Navbar  className ='header' variant='dark' expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
            <Navbar.Brand >BarTenderUg</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Route render={({history}) => <SearchBox history={history}/>}/>
          <Nav className="ml-auto">
          <LinkContainer className='header-cart' to='/cart'>
              <Nav.Link href="/cart">
            <i className=' header-cart fas fa-shopping-cart'></i>cart
            <span className="header__basketCount" >({cartItems.reduce((acc, item)=>acc+item.qty,0)})</span>
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title = {userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/'>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ):(
            <LinkContainer to ='/login'>
                 <Nav.Link >
            <i className='fas fa-user'></i>sign In</Nav.Link>
            </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title = 'admin' id='adminmenu'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Product</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            )}
          </Nav>

        </Navbar.Collapse>
        </Container>
      </Navbar> 
      </>
      <
        /header>
    )
}

export default Header