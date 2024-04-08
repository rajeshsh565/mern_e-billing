import mongoose from "mongoose";

const users = new mongoose.Schema({
  name: String,
  phone: Number,
  address: String,
  email: String,
  password: String,
  role: String,
  avatar: String,
  avatarPublicId: String,
});

users.methods.toJSON = function (){
  const obj = this.toObject();
  return obj;
}
const User = mongoose.model("Users", users);
export default User;
