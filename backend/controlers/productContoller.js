import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// description fetch all products
// route get/api/products
// access public 
const getProducts = asyncHandler(async(req, res)=>{
    const pageSize=9
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {}

    const count = await Product.countDocuments({...keyword})

    const products= await Product.find({...keyword}).limit(pageSize).skip
    (pageSize * (page -1))

    res.json({products , page, pages:Math.ceil(count/pageSize)})
})

// description fetch single products
// route get/api/products/id
// access public
const getProductById = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
    res.status(404)
    throw new Error('Product not found')
}
})

// description delete a product
// route delete/api/products/id
// access private/admin
const deleteProduct= asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
       await product.remove()
       res.json({message: 'product removed'})
    }else{
    res.status(404)
    throw new Error('Product not found')
}
})


// description create a product
// route post/api/products
// access private/admin
const createProduct= asyncHandler(async(req, res)=>{
    const product = new Product({
        name:'Sample name',
        price:0,
        user:req.user._id,
        image:'sample image',
        brand:'Sample brand',
        category:'Sample category',
        countInStock:0,
        numReviews:0,
        description:'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// description update  a product
// route put/api/products
// access private/admin
const updateProduct= asyncHandler(async(req, res)=>{
    const{name,
    price,
    description,
    image,
    brand,
    category,
    countInStock} = req.body

const product = await Product.findById(req.params.id)

if(product){
    product.name=name
    product.price=price
    product.description=description
    product.image=image
    product.brand=brand
    product.category=category
    product.countInStock=countInStock

    const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
}else{
    res.status(404)
    throw new Error('product not found')
}
    
})


// description create a review
// route post/api/products/:id/reviews
// access private
const createProductReview= asyncHandler(async(req, res)=>{
    const{
        rating,
        //  comment
    } = req.body

const product = await Product.findById(req.params.id)

if(product){
  const alreadyReviewed = product.reviews.find(r=> r.user.toString()=== req.user._id.toString())

   if(alreadyReviewed){
        res.status(400)
        throw new Error('product already reviewed')
   }
   const review = {
       name:req.user.name,
       rating:Number(rating),
    //    comment,
       user: req.user._id
   }
   product.reviews.push(review)

   product.numReviews = product.reviews.length

   product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0)
   / product.reviews.length

   await product.save()
   res.status(201).json({message: 'Review added'})

}else{
    res.status(404)
    throw new Error('product not found')
}
    
})

// description get top rated products
// route post/api/products/top
// access piblic
const getTopProducts= asyncHandler(async(req, res)=>{
 const products = await Product.find({}).sort({rating: -1}).limit(4)
    res.json(products)
})

export {
    getProducts,
    getProductById, 
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}