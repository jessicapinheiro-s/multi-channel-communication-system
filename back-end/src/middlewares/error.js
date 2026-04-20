export const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        sucess: false,
        error: err.message || "Internal Server Error"
    })
}