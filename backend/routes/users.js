import express from "express";
import { deleteUser,getUser,updateUser } from '../controllers/user.js';
import {verifyToken, verifyUser } from "../utils/verifyToken.js";



const router = express.Router();

router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user you are logged in")
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user you are logged in and can delete your account")
})


//UPDATE 
router.put("/:id",verifyUser, updateUser);

//DeleteUser

router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id",verifyUser, getUser);


export default router;