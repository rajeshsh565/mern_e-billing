import { StatusCodes } from "http-status-codes";
import Charge from "../models/Charge.js";

export const setCharges = async (req, res) => {
  const charges = await Charge.create(req.body);
  res
    .status(StatusCodes.OK)
    .json({ msg: "charges set successfully!", charges });
};

export const getCharges = async (req, res) => {
  const charges = await Charge.findOne();
  res.status(StatusCodes.OK).json({ charges });
};

export const updateCharges = async (req, res) => {
  const updatedCharges = await Charge.findOneAndUpdate({}, req.body, {
    new: true
  });
  res.status(StatusCodes.OK).json({updatedCharges});
};
