import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique:true,
    },
    email:{
        type: String,
        require: true,
        unique:true,
        
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type:String,
            
    }
   
});

export default mongoose.model("User",UserSchema);