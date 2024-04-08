import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    const status_code = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Something went Wrong, please try again.";
    res.status(status_code).json({msg:message});
    next();
};

export default errorHandlerMiddleware;