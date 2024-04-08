import {Router} from "express";
import { register,login, logout } from "../controllers/authController.js";
import { validateLoginInputs, validateRegisterInputs } from "../middlewares/validationHandlerMiddleware.js";
const router = Router();

router.route("/register").post(validateRegisterInputs,register);
router.route("/login").post(validateLoginInputs,login);
router.route("/logout").get(logout);

export default router;