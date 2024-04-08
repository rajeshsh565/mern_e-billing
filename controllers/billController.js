import { StatusCodes } from "http-status-codes";
import Bill from "../models/Bill.js";
import Charge from "../models/Charge.js";
import Meter from "../models/Meter.js";
import { BadRequestError } from "../Errors/customErrors.js";

export const generateBill = async (req, res) => {
  const { meterNumber, month, year, units } = req.body;
  const meter = await Meter.findOne({ meterNumber });
  const bill = await Bill.find({ meterNumber, month, year });
  if (!meter) {
    throw new BadRequestError(`meter not found!`);
  }
  if (bill.length > 0) {
    throw new BadRequestError(`bill already exists for provided month!`);
  }
  req.body.status = "unpaid";

  const charges = await Charge.findOne();
  const { costPerUnit, serviceCharge, meterRent } = charges;
  req.body.billAmount = units * costPerUnit + serviceCharge + meterRent;
  req.body.ownerId = meter.ownerId;
  const generatedBill = await Bill.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Bill generated!", generatedBill });
};

export const getPendingBills = async (req, res) => {
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
  };
  const userId = req.user.id;
  const pendingBills = await Bill.find({
    ownerId: userId,
    status: "unpaid",
  }).sort(sortOptions.newest);
  res.status(StatusCodes.OK).json({ pendingBills });
};

export const updateBillStatus = async (req, res) => {
  const { status, month, year } = req.body;
  await Bill.findOneAndUpdate({ month, year }, {status}, {new:true});
  res.status(StatusCodes.OK).json({ msg: "bill status updated"});
};

export const getSingleBill = async (req, res) => {
  const { month, year } = req.query;
  if(!month && !year){
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }
  const bill = await Bill.findOne({ month, year, ownerId:req.user.id });
  if(month && year && !bill){
    return res.status(StatusCodes.OK).json({msg:"No Bill found for selected Month!"});
  }
  res.status(StatusCodes.OK).json({ bill });
};
