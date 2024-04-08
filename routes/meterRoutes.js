import Router from "express";
import { getMeter, getMeterRequests, newMeter, requestApproval } from "../controllers/meterController.js";
import { validateMeterApprovalInputs, validateNewMeterInputs } from "../middlewares/validationHandlerMiddleware.js";
import { authorizePermissions } from "../middlewares/authorizePermissions.js";
const router= Router();

router.route("/active-meter").get(getMeter);
router.route("/pending-meter").get(getMeterRequests);
router.route("/request-meter").post(validateNewMeterInputs,newMeter);
router.route("/approve-meter").post(authorizePermissions('admin'),validateMeterApprovalInputs,requestApproval);

export default router;