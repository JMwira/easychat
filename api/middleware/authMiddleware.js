const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Models/UserModel')

const Protect = asyncHandler(async(req, res, next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET||"admin123")
            req.user = await User.findById(decodedToken.id).select('-password')
            next()
        } catch(err){
            res.json(err.message)
            res.status(401)
            console.log('You are required to loggin in order to perform this actionz')
        }
    }
    if(!token){
        res.status(400).json('fail')
        console.log('You are required to loggin in order to perform this actiond')
    }
})

module.exports = {
    Protect
}