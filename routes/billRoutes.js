import Router from "express";
import { generateBill, getPendingBills, updateBillStatus, getSingleBill } from "../controllers/billController.js";
import {authorizePermissions} from "../middlewares/authorizePermissions.js";
import { validateGenerateBillInputs, validateUpdateBillStatusInputs } from "../middlewares/validationHandlerMiddleware.js";
const router = Router();

router.route("/get-pending-bills").get(getPendingBills);
router.route("/generate-bill").post(authorizePermissions('admin'),validateGenerateBillInputs,generateBill);
router.route("/get-single-bill").get(getSingleBill);
router.route("/update-bill-status").patch(validateUpdateBillStatusInputs,updateBillStatus);

export default router;