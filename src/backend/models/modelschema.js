import mongoose from "mongoose";

const schema = new mongoose.schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    birthdate:{
        type:Date,
        required:true
    },
    city:{
        type:String,

    },
    province:{
        type:String,
    },
    country:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String,
        default:null
    }
});

module.exports = mongoose.model('User',userSchema)