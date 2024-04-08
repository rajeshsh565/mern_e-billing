import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Meter from "../models/Meter.js";

export const register = async (req,res) => {
    const userCount = await User.countDocuments();
    const userInput = req.body;
    userCount<1 ? userInput.role="admin" : userInput.role="user";
    const salt = bcryptjs.genSaltSync();
    const encPwd = bcryptjs.hashSync(userInput.password,salt);
    userInput.password = encPwd;
    const newUser = await User.create(userInput);
    res.status(StatusCodes.CREATED).json({msg:"User Created!", newUser});
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const isCorrectPassword = user? bcryptjs.compareSync(password, user.password) : false;
    if(user && isCorrectPassword){
        const payload = {id:user._id, role:user.role};
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        const oneDay = 24 * 60 * 60 * 1000;
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + oneDay * 3),
          secure: process.env.NODE_ENV === "production",
        });
        res.status(StatusCodes.OK).json({msg:`Welcome, ${user.name}`});
    }
    else
    res.status(StatusCodes.UNAUTHORIZED).json({msg:"incorrect email or password!"});
}

export const logout = (req,res) => {
    res.cookie("token", "logout", {
        expires: new Date(Date.now()),
        httpOnly:true
    });
    res.status(StatusCodes.OK).json({msg:"logout success"});
}