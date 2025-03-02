import mongoose from "mongoose";

const schema = new mongoose.schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,

    },
    birthdate:{
        type:Date
    },
    city:{
        type:String,

    },
    province:{
        type:String,
    },
    country:{
        type:String,
    }
});