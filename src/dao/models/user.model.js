import mongoose from "mongoose";
const userCollection = "user";

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{type:String, required:true, unique:true},
    age:Number,
    password:{type:String, required:true},
    cart: {
            type:[{
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts"
                }
                
            }],
            default: []
        },
    role:{type:[String], default:["user"]},

})

export const userModel = mongoose.model(userCollection, userSchema);
