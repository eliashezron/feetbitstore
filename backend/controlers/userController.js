import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// description Auth user & get tpken
// route post/api/users/login
// access public 
const authUser = asyncHandler(async(req, res)=>{
   const {email, password} = req.body

   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))){
      res.json({
         _id:user._id,
         name: user.name,
         email:user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id)
      })
   }else{
      res.status(401)
      throw new Error('Invalid email or password')
   }
   // @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
 
   if (user) {
     res.json({
       _id: user._id,
       name: user.name,
       email: user.email,
       isAdmin: user.isAdmin,
     })
   } else {
     res.status(404)
     throw new Error('User not found')
   }
 })
 
})
// @desc    Get user profile
// @route   GET /api/users
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
   const {name, email, password} = req.body
   const userExists = await User.findById(req.user._id)
 
  if(userExists){
     res.status(400)
     throw new Error('User already exists')
  }
  const User = await User.create({
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
  
 })
//  update profile
// put request
// PUT /api/user/profile
// access privete
const updateUserProfile = asyncHandler(async (req, res) => {
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
 })
 
 //  get all users
// put request
// PUT /api/users
// access private/admin
const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find({})
   res.json(users)
   
 })
 
 //  get all users
// put request
// PUT /api/users
// access private/admin
 const deleteUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)
   
   if(user){
      await user.remove()
      res.json ({ message: 'user removed'})
   }else{
      res.status(404)
      throw new Error('user not found')
   }
   
 })

//  get user by id
// get /api/users
// access private/admin
const getUserById = asyncHandler(async (req, res) => {
   const user = await (await User.findById(req.params.id)).Selecte('-password')
   if(user){
      res.json(user)
   }else{
      res.status(404)
      throw new Error('User not found')
   }
 })
 

//  update user by id
// put /api/users/:id
// access private/admin
 const updateUser = asyncHandler(async (req, res) => {
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

// export {updateUser, getUserById}