import axios from 'axios'
import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form,  Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({match, history}) => {
    const productId=match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [previewSource, setPreviewSource] = useState('')
    // const [selectedFile, setSelectedFile] = useState();
    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    

   useEffect(()=>{
            if(successUpdate){
                dispatch({type: PRODUCT_UPDATE_RESET})
                history.push('/admin/productlist')
            }else{
                
           if(!product.name|| product._id !== productId){
            dispatch(listProductDetails(productId))
             }else{
                setName(product.name)
                setImage(product.Image)
                setPrice(product.price)
                setBrand(product.brand)
                setDescription(product.description)
                setCategory(product.category)
                setCountInStock(product.countInStock)
            }
       
            }

    }, [dispatch,history, productId, product, successUpdate  ])

        const uploadFileHandler=(e)=>{
            const file = e.target.files[0]
            previewFile(file)
            setUploading(true)
        const bodyFormData= new FormData()
        bodyFormData.append('image', file)
        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            uploadImage(reader.result)
            
        }
    }
        const uploadImage=async(base64EncodedImage)=>{

        
        try{
            const config={headers:{
                'Content-Type': 'multipart/form-data'
            }, body:JSON.stringify({data:base64EncodedImage})}
            const {data} = await axios.post('/api/upload', FormData, config)
            console.log(data)
            setImage(data)
            setUploading(false)
        }catch(error){
            console.error(error)
            setUploading(false)
        }
    }
//     const uploadFileHandler =(e)=>{
//         const file = e.target.files[0]
//         previewFile(file)
//         // setSelectedFile(file)
//         // setImage(e.target.value)
//         const reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onloadend=()=>{
//             uploadImage(reader.result)
//         }
//         // const formData = new FormData()
//         // formData.append('image', file)
//         setUploading(true)
// }
//        const uploadImage=async(base64EncodedImage)=>{
//             console.log(base64EncodedImage)
//         try{
//             const config = {
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 body:
//                     JSON.stringify({data:base64EncodedImage})
                
//                 }
//                 const {data} = await axios.post(`https://backend12345678910.herokuapp.com/api/upload`, config)
//                 // setImage()
//                 setImage(data)
//                 setPreviewSource('')
//                 setUploading(false)

//         }catch(error){
//             console.error(error)
//             setUploading(false)
//         }
//     }
    const previewFile=(file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewSource(reader.result)
        }
    }

     const submithandler = (e) =>{
         e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
         
        
     }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
        
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading? <Loader/>: error ? <Message variant='danger'></Message>
            :(
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
                <Form.Group controlId='Price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter Price'
                    value={price}
                    onChange={(e)=> setPrice(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e)=> setImage(e.target.value)}>
                    </Form.Control>  
                  <Form.File id='image-file' 
                  label='choose File' 
                  custom 
                  onChange={uploadFileHandler}>
                  </Form.File>
                  {uploading ? <Loader/> : previewSource ? (<img src={previewSource} alt='chosenimg' style={{height:'200px'}}/>):''}
                </Form.Group>
                <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Brand name'
                    value={brand}
                    onChange={(e)=> setBrand(e.target.value)}>

                    </Form.Control>  
                  
                </Form.Group>
                <Form.Group controlId='countInStock'>
                <Form.Label>CountInStock</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter countInStock url'
                    value={countInStock}
                    onChange={(e)=> setCountInStock(e.target.value)}>

                    </Form.Control>  
                  
                </Form.Group>
                <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Category'
                    value={category}
                    onChange={(e)=> setCategory(e.target.value)}>

                    </Form.Control>  
                  
                </Form.Group>
                <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Description '
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}>

                    </Form.Control>  
                  
                </Form.Group>
               
                    <Button type='submit'
                    variant='primary'>
                    Update
                    </Button>
                
            </Form>
            )}
        </FormContainer>
        </>
    )
   
}

export default ProductEditScreen
