import axios from 'axios'
import{ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    // ORDER_PAY_SUCCESS,
    // ORDER_PAY_FAIL,
    // ORDER_PAY_REQUEST,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_ALL_FAIL,
    ORDER_LIST_ALL_SUCCESS,
    ORDER_LIST_ALL_REQUEST,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_PAY_ON_DELIVERY_FAIL,
    ORDER_PAY_ON_DELIVERY_SUCCESS,
    ORDER_PAY_ON_DELIVERY_REQUEST,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL} from '../constants/orderConstants'
    import {CART_CLEAR_ITEMS} from '../constants/cartConstants'
    import { logout } from './userActions'


    export const createOrder = (order) => async(dispatch, getState)=>{
        try{
    
            dispatch({
                type: ORDER_CREATE_REQUEST
            })
    
            const {userLogin:{userInfo} } = getState()
    
            const config = {
                headers:{
                    'content-Type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
    
            const{data}= await axios.post(`https://backend12345678910.herokuapp.com/api/orders`, order, 
             config)
    
            dispatch({
                type:ORDER_CREATE_SUCCESS,
                payload: data
            })
            dispatch({
              type: CART_CLEAR_ITEMS,
              payload: data,
            })
            localStorage.removeItem('cartItems')
   

}catch(error){
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  if (message === 'Not authorized, token failed') {
    dispatch(logout())
  }
  dispatch({
    type: ORDER_CREATE_FAIL,
    payload: message,
  })
}
}

export const getOrderDetails= (id) => async(dispatch, getState)=>{
    try{

        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {userLogin:{userInfo} } = getState()

        const config = {
            headers:{
                
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const{data}= await axios.get(`https://backend12345678910.herokuapp.com/api/orders/${id}`,
         config)

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload: data
        })


}catch(error){
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  if (message === 'Not authorized, token failed') {
    dispatch(logout())
  }
  dispatch({
    type: ORDER_DETAILS_FAIL,
    payload: message,
  })
}
}
// export const payOrder= (orderId, paymentResult) => async(dispatch, getState)=>{
//     try{

//         dispatch({
//             type: ORDER_PAY_REQUEST
//         })

//         const {userLogin:{userInfo} } = getState()

//         const config = {
//             headers:{
//                 'Content-Type':'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const{data}= await axios.put(`/api/orders/${orderId}/pay`,paymentResult,
//          config)

//         dispatch({
//             type:ORDER_PAY_SUCCESS,
//             payload: data
//         })


//     }catch(error){
    
//         const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       if (message === 'Not authorized, token failed') {
//         dispatch(logout())
//       }
//       dispatch({
//         type: ORDER_PAY_FAIL,
//         payload: message,
//       })
//     }
//   }


    export const listMyOrders= () => async(dispatch, getState)=>{
        try{
    
            dispatch({
                type: ORDER_LIST_MY_REQUEST
            })
    
            const {userLogin:{userInfo}, } = getState()
    
            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
    
            const{data}= await axios.get(`https://backend12345678910.herokuapp.com/api/orders/myorders`,
             config)
    
            dispatch({
                type:ORDER_LIST_MY_SUCCESS,
                payload: data
            })
    
    
        }catch(error){
            const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          if (message === 'Not authorized, token failed') {
            dispatch(logout())
          }
          dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: message,
          })
        }
      }

        export const listAllOrders= () => async(dispatch, getState)=>{
            try{
        
                dispatch({
                    type: ORDER_LIST_ALL_REQUEST
                })
        
                const {userLogin:{userInfo}, } = getState()
        
                const config = {
                    headers:{
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
        
                const{data}= await axios.get(`https://backend12345678910.herokuapp.com/api/orders`,
                 config)
        
                dispatch({
                    type:ORDER_LIST_ALL_SUCCESS,
                    payload: data
                })
        
        
            }catch(error){
                const message =
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message
              if (message === 'Not authorized, token failed') {
                dispatch(logout())
              }
              dispatch({
                type: ORDER_LIST_ALL_FAIL,
                payload: message,
              })
            }
          }


            export const deliveredOrder= (id) => async(dispatch, getState)=>{
                try{
            
                    dispatch({
                        type: ORDER_DELIVERED_REQUEST
                    })
            
                    const {userLogin:{userInfo} } = getState()
            
                    const config = {
                        headers:{
                            
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    }
            
                    const{data}= await axios.put(`https://backend12345678910.herokuapp.com/api/orders/${id}/deliver`,{},
                     config)
            
                    dispatch({
                        type:ORDER_DELIVERED_SUCCESS,
                        payload: data
                    })
            
            
                }catch(error){
                    const message =
                    error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message
                  if (message === 'Not authorized, token failed') {
                    dispatch(logout())
                  }
                  dispatch({
                    type: ORDER_DELIVERED_FAIL,
                    payload: message,
                  })
                }
              }
              export const payOrderOnDelivery= (orderId) => async(dispatch, getState)=>{
                try{
            
                    dispatch({
                        type: ORDER_PAY_ON_DELIVERY_REQUEST
                    })
            
                   
            
                    const config = {
                      headers:{
                        'Content-type':'application/json'
                      }
                  }
                    
                    const {data} = await axios.put(`https://backend12345678910.herokuapp.com/api/orders/${orderId}/payondelivery`,  config)
                    
                    
                    dispatch({
                        type:ORDER_PAY_ON_DELIVERY_SUCCESS,
                        payload:data
                    })
                    
                    
                }catch(error){
                
                    const message =
                    error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message
                  if (message === 'Not authorized, token failed') {
                    dispatch(logout())
                  }
                  dispatch({
                    type: ORDER_PAY_ON_DELIVERY_FAIL,
                    payload: message,
                  })
                }
              }
              export const deleteOrder = (id) => async(dispatch, getState)=>{
                try{
            
                    dispatch({
                        type: ORDER_DELETE_REQUEST,
                    })
            
                    const {userLogin:{userInfo}, } = getState()
            
                    const config = {
                        headers:{
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    }
            
                     await axios.delete(`https://backend12345678910.herokuapp.com/api/orders/${id}`,
                     config)
            
                    dispatch({
                        type:ORDER_DELETE_SUCCESS,
                       
                    })
            
            
                }catch(error){
                dispatch({
                type: ORDER_DELETE_FAIL,
                payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message
                })
                }
                }