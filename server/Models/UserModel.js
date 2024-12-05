import mongoose from "mongoose";


///// To define the schema ...
const UserSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
})


const UserModel = mongoose.model("userinfos", UserSchema);
export default UserModel;