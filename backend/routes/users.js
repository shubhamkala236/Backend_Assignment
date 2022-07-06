import express from "express";
import { deleteUser,getUser,updateUser } from '../controllers/user.js';



const router = express.Router();

//UPDATE 
router.put("/:id", updateUser);

//DeleteUser

router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);


export default router;