import express from 'express'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router()


// import{ authUser} from '../controlers/userContoller.js'

router.route('/')
.post(
   asyncHandler(async (req, res) => {
      const {name, email, password} = req.body
      const userExists = await User.findOne({email})
    
     if(userExists){
        res.status(400)
        throw new Error('User already exists')
     }
     const user = await User.create({
        name,
        email,
        password
     })
     if(user){
        res.status(201).json({
         _id:user._id,
         name: user.name,
         email:user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id)
      })
     }else{
        res.status(400)
        throw new Error ('invalid user information')
     }
   }))
   .get(protect, admin,  asyncHandler(async (req, res) => {
      const users = await User.find({})
      res.json(users)
      
    }))
    //get all users

router.post('/login', 
// authUser
asyncHandler(async(req, res)=>{
   const {email, password} = req.body

   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))){
      res.json({
         _id:user._id,
         name: user.name,
         email:user.email,
         isAdmin: user.isAdmin,
         telephoneNumber:user.telephoneNumber,
         token: generateToken(user._id),
      })
   }else{
      res.status(401)
      throw new Error('Invalid email or password')
   }
}))
// get user profile
router.route('/profile')
.get (protect,
asyncHandler(async(req, res)=>{
   const user = await User.findById(req.user._id)

   if(user){
      res.json({_id:user._id,
         name: user.name,
         email:user.email,
         isAdmin: user.isAdmin,})
      
   }else{
      res.status(404)
      throw new Error('User not found')
   }
}))


// update user profile
.put(protect,
   asyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id)
    
      if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email ||user.email
        if(req.body.password){
           user.password = req.body.password
        }
   
        const UpdatedUser =  await user.save()
        res.json({
         _id:UpdatedUser._id,
         name: UpdatedUser.name,
         email:UpdatedUser.email,
         isAdmin: UpdatedUser.isAdmin,
         token: generateToken(UpdatedUser._id)
      })
      } else {
        res.status(404)
        throw new Error('User not found')
      }
    }))

    router.route('/:id')
    .delete(protect, admin, asyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id)
      
      if(user){
         await user.remove()
         res.json ({ message: 'user removed'})
      }else{
         res.status(404)
         throw new Error('user not found')
      }
      
    }))
    .get(protect, admin, asyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id).select('-password')
      if(user){
         res.json(user)
      }else{
         res.status(404)
         throw new Error('User not found')
      }
    })
    )
    .put(protect, admin, asyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id)
    
      if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email ||user.email
        user.isAdmin = req.body.isAdmin
   
        const UpdatedUser =  await user.save()
   
        res.json({
         _id:UpdatedUser._id,
         name: UpdatedUser.name,
         email:UpdatedUser.email,
         isAdmin: UpdatedUser.isAdmin,
       
      })
      } else {
        res.status(404)
        throw new Error('User not found')
      }
    })
   )
   

export default router