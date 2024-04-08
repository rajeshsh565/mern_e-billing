import Router from "express";
import { getCharges, setCharges, updateCharges } from "../controllers/chargeController.js";
const router = Router();

router.route("/set-charges").post(setCharges);
router.route("/get-charges").get(getCharges);
router.route("/update-charges").patch(updateCharges);

export default router;