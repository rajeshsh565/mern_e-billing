import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { formatImage } from "../middlewares/multerMiddleware.js";
import cloudinary from "cloudinary";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json(users);
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById({ _id: req.user.id });
  const obj = user.toJSON();
  delete obj.password;
  res.status(StatusCodes.OK).json({ user: obj });
};

export const changePassword = async (req, res) => {
  const newGenSalt = bcryptjs.genSaltSync(10);
  const newHash = bcryptjs.hashSync(req.body.newPassword, newGenSalt);
  await User.findByIdAndUpdate(req.user.id, { password: newHash });
  res.status(StatusCodes.OK).json({ msg: "password successfully updated" });
};

export const updateUser = async (req, res) => {
  const obj = req.body;
  delete obj.email;
  delete obj.password;
  delete obj.role;
  if (req.file) {
    const formattedImage = formatImage(req.file);
    const profile = await cloudinary.v2.uploader.upload(formattedImage);
    if(profile){
      obj.avatar = profile.url;
      obj.avatarPublicId = profile.public_id;
    }
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, obj);
  if(req.file && updatedUser.avatarPublicId){
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "user info successfully updated!" });
};

export const getSingleUser = async (req,res) => {
  const user = await User.findById(req.body.userId);
  res.status(StatusCodes.OK).json({user});
}