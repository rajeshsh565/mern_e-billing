import { BadRequestError, UnAuthorizedError } from "../Errors/customErrors.js";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import Meter from "../models/Meter.js";
import bcryptjs from "bcryptjs";

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
const years = ["2022", "2023", "2024"];

const withValidationErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => " " + error.msg);
        if (errorMessages[0].startsWith(" not authorized")) {
          throw new UnAuthorizedError(errorMessages);
        } else throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInputs = withValidationErrors([
  body("name").trim().notEmpty().withMessage("name can not be empty"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("invalid email provided")
    .custom(async (email) => {
      const user = User.find({ email });
      if (user.length > 0) {
        throw new Error("user with provided email already exists");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password can not be empty")
    .isLength({ min: 8 })
    .withMessage("password can not be shorter than 8 characters"),
]);

export const validateLoginInputs = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("invalid email provided"),
  body("password").trim().notEmpty().withMessage("password can not be empty"),
]);

export const validateNewMeterInputs = withValidationErrors([
  body("meterLocation")
    .notEmpty()
    .withMessage("location can not be empty")
    .isIn(["inside", "outside"])
    .withMessage("invalid meter location"),
  body("meterType")
    .notEmpty()
    .withMessage("type can not be empty")
    .custom(async (meterType) => {
      const type = "electric meter";
      if (meterType !== type) {
        throw new Error("invalid meter type");
      }
    }),
  body("phaseCode")
    .notEmpty()
    .withMessage("phase code can not be empty")
    .isIn(["011", "022", "033", "044"])
    .withMessage("invalid phase code"),
  body("billType")
    .notEmpty()
    .withMessage("bill type can not be empty")
    .isIn(["regular", "industrial"])
    .withMessage("invalid bill type"),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("address can not be empty")
    .isLength({ min: 25 })
    .withMessage("please provide complete address"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("phone number can not be empty")
    .isMobilePhone()
    .withMessage("please enter a valid phone number")
    .isLength({ min: 10, max: 10 })
    .withMessage("phone number must be 10 digits"),
]);

export const validateUserUpdateInputs = withValidationErrors([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name can not be empty")
    .custom((name) => {
      const regex = /[^a-zA-Z\s]/;
      if (regex.test(name)) {
        throw new Error("name can only contain alphabets");
      }
      return true;
    }),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("address can not be empty")
    .isLength({ min: 25 })
    .withMessage("please provide complete address"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("phone number can not be empty")
    .isMobilePhone()
    .withMessage("please enter a valid phone number")
    .isLength({ min: 10, max: 10 })
    .withMessage("phone number must be 10 digits"),
]);

export const validateMeterApprovalInputs = withValidationErrors([
  body("meterNumber")
    .trim()
    .notEmpty()
    .withMessage("meter number can not be empty")
    .isLength({ min: 6, max: 6 })
    .withMessage("invalid meter number")
    .custom(async (meterNumber) => {
      const meter = await Meter.findOne({ meterNumber });
      if (!meter) {
        throw new Error("meter number not found");
      }
      if (meter.status === "active") {
        throw new Error("meter already approved");
      }
    }),
]);

export const validateChangePasswordInputs = withValidationErrors([
  body("password")
    .trim()
    .notEmpty()
    .withMessage("old password can not be empty")
    .custom(async (password, { req }) => {
      const user = await User.findOne({ _id: req.user.id });
      const isValidUser = bcryptjs.compareSync(password, user.password);
      if (!isValidUser) {
        throw new Error("incorrect old password");
      }
    }),
  body("newPassword")
    .notEmpty()
    .withMessage("new password can not be empty")
    .isLength({ min: 8 })
    .withMessage("min length for password is 8")
    .custom((newPassword, { req }) => {
      if (newPassword == req.body.password) {
        throw new Error("new password can not be same as old password");
      }
    }),
  body("confirmNewPassword")
    .notEmpty()
    .withMessage("confirm password can not be empty")
    .isLength({ min: 8 })
    .withMessage("min length for password is 8")
    .custom((confirmPassword, { req }) => {
      console.log(confirmPassword);
      if (confirmPassword != req.body.newPassword) {
        throw new Error("confirm password do not match");
      }
      return true;
    }),
]);

export const validateUpdateBillStatusInputs = withValidationErrors([
  body("status")
    .notEmpty()
    .withMessage("status can not be empty")
    .isIn(["paid", "unpaid"])
    .withMessage("unknown bill status received"),
  body("month")
    .notEmpty()
    .withMessage("month can not be empty")
    .isIn(months)
    .withMessage("invalid month input"),
  body("year")
    .notEmpty()
    .withMessage("year can not be empty")
    .isIn(years)
    .withMessage("invalid year input"),
]);

export const validateGenerateBillInputs = withValidationErrors([
  body("month")
    .notEmpty()
    .withMessage("month can not be empty")
    .isIn(months)
    .withMessage("invalid month input"),
  body("year")
    .notEmpty()
    .withMessage("year can not be empty")
    .isIn(years)
    .withMessage("invalid year input"),
  body("meterNumber").notEmpty().withMessage("meter number can not be empty").custom(async(meterNumber)=>{
    const meter = await Meter.findOne({meterNumber});
    if(!meter || (meter && meter.status=="pending")){
      throw new Error ("meter does not exist");
    }
  }),
  body("units").notEmpty().withMessage("units can not be empty").isNumeric().withMessage("units must be numeric").custom((value, { req }) => {
    if (isNaN(value) || value < 0 || value > 999) {
      throw new Error("units must be between 0 and 999.");
    }
    return true;
  })
]);
