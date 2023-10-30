const bcrypt = require('bcryptjs')
const User = require ('../Models/UserModel')
const jwt = require('jsonwebtoken')
const validator = require('email-validator')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dca92db95af551",
      pass: "339825a86e3987"
    }
  });

//get User
//private route
//get:api/users/me
const getMe =  async(req, res)=>{
    const Users = await User.find()
    res.json(Users)
}

//register User
//private route
//post:auth
const registerUser = async(req, res)=>{
    const {name, email, phone, password, about, code} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedP = await bcrypt.hash(password, salt)
    const fetchUsers = await User.findOne({email:req.body.email})
    if(fetchUsers){
        res.json('this user already exists')
    } else{
        if(validator.validate(email)){
            const save_user = await User.create({
                name,
                phone,
                email,
                password:hashedP,
                about,
                code:Math.random().toString().substr(2, 6)
            })
            if(save_user){
                res.json({token:generateToken(save_user.id)})
                const mailOptions = {
                    from:'jaymwira@gmail.com',
                    to:req.body.email,
                    subject: 'Account creation confirmation',
                    text:`Hello dearest, we are pleased to confirm with you that your account has been successfully created with ${save_user.code} as your access code`
                }
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        res.json(error)
                    } else{
                        res.json('Email sent')
                    }
                })
            } else{
                res.json('user registration failed')
            }
        } else{
            res.json('invalid email, please make sure you have your email well spelled')
        }
    }
}


const sign_in = async(req, res)=>{
    const {phone, Code} = req.body
    const get_user = await User.findOne({phone:phone})
    if(get_user){
        const code  = get_user.code
        if(code==Code){
            res.json({token:generateToken(get_user._id)})
        } else{
            res.json("wrong credentials")
        }
    } else{
        res.json('Wrong credential')
    }
}
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET||'admin123',{expiresIn:'30d'})
}

module.exports = {
    getMe,
    registerUser,
    sign_in
}