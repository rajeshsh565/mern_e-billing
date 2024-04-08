import { UnAuthenticatedError } from "../Errors/customErrors.js";
import jwt from "jsonwebtoken";

export const validateUser = (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        throw new UnAuthenticatedError("invalid login");
    }
    try {
        const {id, role} = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id, role}
        next()
    } catch (error) {
        throw new UnAuthenticatedError("invalid login");
    }
};

