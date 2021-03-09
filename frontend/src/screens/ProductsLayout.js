import React, { Component , useRef} from 'react'
import {  useSelector } from 'react-redux'
import Product from '../components/Product'
import ReorderTwoToneIcon from '@material-ui/icons/ReorderTwoTone';
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';

const productList = useSelector((state) => state.productList)
    const{ products} = productList

    const fooRef = useRef(null)
    const fooBarNode = fooRef.current
    console.log(fooBarNode)
    const listRef = useRef(null)
    const listBarNode = listRef.current
export default class ProductsLayout extends Component {
    state={
        className: null
    }
    
    
    handleChangeGrid=(e)=>{
          const arc = fooBarNode.classList.remove('grid')
        listBarNode.classList.add('stack')
        this.setState( {
            className: arc
        })
        
        
    }
    handleChangeList=(e)=>{
        const arn = listRef.classList.add('grid')
        fooRef.classList.remove('stack')
        this.setState({
            className:arn
        })
    }
    
    render() {
        
        return (
            <div>
                  <div className= {this.state.className}>
                    <div className='grid'>
                        <div className='layout-stack' ref={fooRef}><ReorderTwoToneIcon className='button' onClick={this.handleChangeGrid}/></div>
                        <div className='layout-grid' ref={listRef}><AppsTwoToneIcon className='button' onClick={this.handleChangeList}/></div>
                    </div>
                  </div>
                  <div className='list' >
                      {/* sm={12} xs={6} md={4} lg={4} xl={3} */}
                      {products.map((product) => (
                    <div  key={product._id} >
                      <Product className='column-img' product={product} />
                    </div>
                    ))}
                  </div>
            </div>
        )
    }
}
