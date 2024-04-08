import mongoose from "mongoose";

const bills = new mongoose.Schema({
  meterNumber:String,
  month: String,
  year: String,
  units: Number,
  billAmount: Number,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  status: {
    type:String,
    enum: ["paid", "unpaid"]
  }
},{timestamps:true});

const Bill = mongoose.model("Bills", bills);
export default Bill;