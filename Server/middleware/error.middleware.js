const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.massage = err.massage || "SomeThing went Wrong ";
    res.status(err.statusCode).json({
        success: false,
        massage: err.massage,
        stack: err.stack,
    });
}

export default errorMiddleware;