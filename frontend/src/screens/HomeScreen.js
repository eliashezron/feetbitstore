import React, { useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import {Row , Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import {listProducts} from '../actions/productActions'
import './HomeScreen.css'
import ReorderTwoToneIcon from '@material-ui/icons/ReorderTwoTone';
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const [isGrid, setIsGrid] = useState(true)
    console.log(isGrid)

    const productList = useSelector((state) => state.productList)
    const{loading, error, products, page, pages} = productList

    useEffect(() => {
        dispatch(listProducts(keyword , pageNumber))
    }, [dispatch, keyword, pageNumber])

    
    // const fooRef = useRef(null)
    // const fooBarNode = fooRef.current
    // console.log(fooBarNode)
    // const listRef = useRef(null)
    // const listBarNode = listRef.current
    // const handleChangeGrid=(e)=>{
    //     fooBarNode.classList.remove('grid')
    //     listBarNode.classList.add('stack')
    // }
    // const handleChangeList=(e)=>{
    //       listRef.classList.add('grid')
    //     fooRef.classList.remove('stack')
    // }
    // console.log(document.querySelector(".layout-icons"))
    // const handleChangeGrid=(e)=>{
    //   const arc = document.querySelector(".layout-icons")
    //   if (arc !== null && !arc.classList.contains('layout-icons')){
    //       arc.classList.remove('grid').classList.add('stack')
    //     }
    //     e.preventDefault()
    //   }

    // const handleChangeList=(e)=>{
    //   const arc = document.querySelector(".layout-icons")
    //   if (arc !== null && !arc.classList.contains('layout-icons')){
    //       arc.classList.remove('grid').classList.add('stack')
    //     }
    //   e.preventDefault()
      
    // }
    
    

// let controls = document.querySelector(".controls");
// let stackControl = controls.querySelector(".layout-stack");
// let gridControl = controls.querySelector(".layout-grid");
// let list = document.querySelector(".list");

// stackControl.addEventListener("click",function(){
//   controls.classList.remove("grid");
//   list.classList.add("stack");
// });
// gridControl.addEventListener("click",function(){
//   controls.classList.add("grid");
//   list.classList.remove("stack");
// });

// let classname 
//  if(isGrid === true){
//    classname = 'grid'
//  }else{
//    classname = 'stack'
//  }
// console.log(classname)
    return (
        <>
        <Meta/>
        {!keyword ? <ProductCarousel/> :(
            <Link to='/' className='btn btn-light'>
                Go Back
            </Link>
        )}
          <h1>Lastest Products</h1>
          {loading ? <Loader/>: error ?(
              <Message variant= 'danger'>{error} </Message> 
              ):( 
                  <>
                  <div className={`layout-icons ${isGrid===true?'grid':''}`} >
                    <div className={`layout-stack `}><ReorderTwoToneIcon onClick={()=> setIsGrid(false)}/></div>
                    <div className={`layout-grid`}><AppsTwoToneIcon onClick={()=>setIsGrid(true)}/></div>
                  </div>
                  <div className={`list ${isGrid===false?'stack':''}`} >
                      {/* sm={12} xs={6} md={4} lg={4} xl={3} */}
                      {products.map((product) => (
                    <div  key={product._id} >
                      <Product className='column-img' product={product} />
                    </div>
                    ))}
                  </div>
             <Paginate
              page={page}
               pages={pages} 
               keyword={keyword ? keyword: ''}
               />
               </>)
          }
        </>
    )
}

export default HomeScreen
