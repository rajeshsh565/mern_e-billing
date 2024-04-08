import { Router } from "express";
import { getAllUsers, getCurrentUser, changePassword, updateUser, getSingleUser } from "../controllers/userController.js";
import {validateChangePasswordInputs, validateUserUpdateInputs} from "../middlewares/validationHandlerMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { authorizePermissions } from "../middlewares/authorizePermissions.js";

const router = Router();

router.route("/").get(authorizePermissions("admin"),getAllUsers);
router.route("/get-user").post(authorizePermissions("admin"),getSingleUser);
router.route("/current-user").get(getCurrentUser);
router.route("/change-password").patch(validateChangePasswordInputs,changePassword);
router.route("/update-user").patch(upload.single("avatar"),validateUserUpdateInputs,updateUser);

export default router;