import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message:  {
        success: false,
        error: "Too many requests, try again later"
    }
});

export const authLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    max: 5,
    message:  {
        success: false,
        error: "Too many login attempts"
    }
});

