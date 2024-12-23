import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    email: {type:  String , required: true, unique: true},
    password: {type : String, required: true},
    // tags:{type: [String]},
    // name:{type:String,required:true},
    // about:{type:String},
    // joinedOn: {type:Date, default: Date.now}
})

export default mongoose.model("User",userSchema)