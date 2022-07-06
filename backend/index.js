import express  from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from 'cors';
import usersRoute from './routes/users.js'   
import authRoute from './routes/auth.js'    



const app = express();
dotenv.config();

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to database");
    } catch (error) {
        throw error;
    }
};

// if disconnection occurs 
mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected");
});

//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);

//error handling
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage= err.message || "Something went wrong";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(8000,()=>{
    connect()
    console.log("Connected to backend");
});

