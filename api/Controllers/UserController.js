const bcrypt = require('bcryptjs')
const User = require ('../Models/UserModel')
const jwt = require('jsonwebtoken')

//get User
//private route
//get:api/users/me
const getMe =  async(req, res)=>{
    const Users = await User.find()
    res.json("retrieving users")
}
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'})
}

module.exports = {
    getMe
}