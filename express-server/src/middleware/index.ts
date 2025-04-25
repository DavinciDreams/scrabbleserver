// src/middleware/index.ts

export const exampleMiddleware = (req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
};

// Additional middleware functions can be added here