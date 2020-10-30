import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,
productDeleteReducer, 
productCreateReducer,productReviewCreateReducer, productTopRatedReducer,
productUpdateReducer} from './reducers/productReducers'
import { productDetailsReducer } from './reducers/productDetailsReducer'
import {cartReducer} from './reducers/cartReducer'
import {userDeleteReducer, userListReducer, userLoginReducer, userUpdateProfileReducer} from './reducers/userReducers'
import {userRegisterReducer,
          userDetailsReducer,userUpdateReducer
          } from './reducers/userReducers'
import {orderCreateReducer, orderListAllReducer,
      orderDetailsReducer,
      orderDeleteReducer,
     // orderPayReducer,
     orderPayOnDeliveryReducer,
     orderDeliveredReducer, orderListMyReducer} from './reducers/orderReducers'
const reducer = combineReducers({
     productList: productListReducer,
     productDetails: productDetailsReducer,
     productDelete:productDeleteReducer,
     cart: cartReducer,
     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     userDetails:userDetailsReducer,
     userUpdateProfile:userUpdateProfileReducer,
     userList: userListReducer,
     orderDelete:orderDeleteReducer,
     orderCreate: orderCreateReducer,
     orderDetails:orderDetailsReducer,
     // orderPay:orderPayReducer,
     orderPayOnDelivery:orderPayOnDeliveryReducer,
     orderListMy:orderListMyReducer,
     orderListAll:orderListAllReducer,
     userDelete:userDeleteReducer,
     userUpdate:userUpdateReducer,
     productCreate:productCreateReducer,
     productUpdate:productUpdateReducer,
     orderDelivered:orderDeliveredReducer,
     productReviewCreate:productReviewCreateReducer,
     productTopRated:productTopRatedReducer
})
 
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')):[]


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse
(localStorage.getItem('shippingAddress')):{}


const initialState = {
     cart:{
          cartItems: cartItemsFromStorage,
          shippingAddress:shippingAddressFromStorage,
     },
     userLogin:{
          userInfo: userInfoFromStorage
     }
}

 const middleware = [thunk]

const store = createStore(reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware)
))

export default store