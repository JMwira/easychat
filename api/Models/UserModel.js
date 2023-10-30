const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please fill in the name'],
        maxLength:25,
        minLength:3
    },
    phone:{
        type:String,
        maxLength:10,
        minLength:3
    },
    email:{
        type:String,
        required:[true,'Please fill in the email']
    },
    password:{
        type:String,
        required:[true,'Please fill in the password'],
        minLength:3
    },
    about:{
        type:String,
        minLength:3
    },
    active:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:Buffer,
        required:true
    }
},{
 timestamps:true
})

module.exports = mongoose.model('User', userSchema)