import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


//register 
export const register = async (req, res, next) => {
    try {
      
      const confirmPassword = req.body.confirmPassword;
      if (confirmPassword!=req.body.password){
        return next(createError(401, "Please confirm password correctly"));
      }

      
      
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
  
      await newUser.save();
      res.status(200).send("User created Successfully");
    } catch (err) {
      next(err);
    }
  };
  

//login
export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found"));
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong Password or Username"));
      // seperating isadmin and password from user so only display other properties
      const { password, ...otherDetails } = user._doc;
      //if all correct generate token
      const token = jwt.sign(
        { id: user._id},
        process.env.JWT_KEY
      );
  
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ ...otherDetails });
    } catch (err) {
      next(err);
    }
  };