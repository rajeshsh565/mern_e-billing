import mongoose from "mongoose";

const charges = new mongoose.Schema({
  costPerUnit: Number,
  serviceCharge: Number,
  meterRent: Number
});

const Charge = mongoose.model("Charges", charges);
export default Charge;
