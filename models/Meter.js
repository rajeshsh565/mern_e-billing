import mongoose from "mongoose";

const meters = new mongoose.Schema({
  meterNumber: String,
  meterLocation: {
    type: String,
    enum: ["inside", "outside"],
  },
  meterType: {
    type: String,
    default: "electric meter",
  },
  phaseCode: {
    type: String,
    enum: ["011", "022", "033", "044"],
  },
  billType: {
    type: String,
    enum: ['regular', 'industrial']
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  status: {
    type: String,
    enum: ["active", "pending"]
  }
});
const Meter = mongoose.model("Meters", meters)
export default Meter;