import { StatusCodes } from "http-status-codes";
import Meter from "../models/Meter.js";
import User from "../models/User.js";
import { meterNumberGen } from "../utils/meterNumberGen.js";

export const newMeter = async (req, res) => {
  req.body.ownerId = req.user.id;
  let meterNumber;
  let existingMeter;
  do {
    meterNumber = meterNumberGen();
    existingMeter = await Meter.findOne({ meterNumber });
  } while (existingMeter);
  req.body.meterNumber = meterNumber;
  const address = req.body.address;
  const phone = req.body.phone;
  const meterCount = await Meter.countDocuments({ ownerId: req.user.id });
  if (meterCount === 2) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({
        msg: "Already a pending meter request. Please wait for approval!",
      }); //approve button for admin will delete a meter;
  }
  meterCount === 0
    ? (req.body.status = "active")
    : (req.body.status = "pending");
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { address, phone },
    { new: true }
  );
  const meter = await Meter.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "meter request successful!", meter, updatedUser });
};

export const getMeter = async (req, res) => {
  const isAdmin = req.user.role === "admin";
  let meter;
  if (isAdmin) {
    meter = await Meter.find({status:"active"});
  } else meter = await Meter.findOne({ ownerId: req.user.id, status:"active" });
  res.status(StatusCodes.OK).json({ meter });
};

export const getMeterRequests = async (req, res) => {
  const isAdmin = req.user.role === "admin";
  let meter;
  if (isAdmin) {
    meter = await Meter.find({status:"pending"});
  } else meter = await Meter.findOne({ ownerId: req.user.id, status:"pending" });
  // const meter = await Meter.findOne({ ownerId: req.user.id, status:"pending" });
  res.status(StatusCodes.OK).json({meter});
};

// approval being done with post method
export const requestApproval = async (req, res) => {
    const {meterNumber, approval} = req.body;
  const pendingMeter = await Meter.findOne({meterNumber:meterNumber});
  if(approval == "approve"){
    await Meter.deleteOne({ownerId: pendingMeter.ownerId, status:"active"});
    await Meter.findByIdAndUpdate(pendingMeter._id, {status:"active"});
    return res.status(StatusCodes.OK).json({ msg: "request approved!" });
  }
  await Meter.deleteOne({meterNumber:meterNumber }); 
  res.status(StatusCodes.OK).json({ msg: "request rejected!" });
};
