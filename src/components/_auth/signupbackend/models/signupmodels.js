const mongoose = require('mongoose')


const signUpTemplate = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    contactnumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Reason:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User', signUpTemplate, 'joinus');