import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import cors from 'cors'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import cloud from '../utils/cloudinary.js'
// import asyncHandler from 'express-async-handler'

// app config
const __dirname = path.resolve(path.dirname('')); 
dotenv.config({path:__dirname + '/.env'})

connectDB()


const app = express()
app.use(cors())

app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// api requests
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.post('/api/upload', uploadRoutes)
// asyncHandler(req, res=>{
//    try{
//        const fileStr = req.body.data;
//       const result = await cloud.uploader.upload(fileStr,{
//            upload_preset:'ml_default'
//        })
//        console.log(result)
//        res.json({msg:'uploaded succesfully'})
//    }catch(err){
//        console.log(err)
//        res.status(500).json({err : 'something went wrong'})
//    }


// 
// // deloying to the server
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, '/frontend/build')))

//     app.get('*', (req, res)=>
//      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
// }
app.get('/', (req, res) => res.send('Hello from Express!'))

// // middleware
// error middleware
app.use(notFound)

app.use(errorHandler)


// port listen
const PORT = process.env.PORT || 5000 
app.listen(PORT, console.log (`server running in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold))