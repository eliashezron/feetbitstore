import React from 'react'
import {Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import LocalMallIcon from '@material-ui/icons/LocalMall';
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
        <Container md='auto' className='container-header'>
        {/* <Container > */}
        <LinkContainer to='/'>
            <Navbar.Brand >Feetbit</Navbar.Brand>
        </LinkContainer>  
        <Container className='search'> 
            <Route render={({history}) => <SearchBox history={history}/>}/>
          </Container> 
          <LinkContainer md='auto' className='header-cart' to='/cart'>
              <Nav.Link href="/cart">
            
              <LocalMallIcon className='cart-icon'/>
            
            
            <span className="header__basketCount" >{cartItems.reduce((acc, item)=>acc+item.qty,0)}</span>
            </Nav.Link>
          </LinkContainer>
          {/* </Container> */}
          
        <Navbar.Toggle aria-controls="basic-navbar-nav" md='auto'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">

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