"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const jwt_1 = require("../lib/jwt");
const authMiddleware = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        try {
            const token = bearerToken.replace(/^Bearer /, " ");
            const decoded = (0, jwt_1.verify)(token);
            res.locals.user = decoded;
            next();
        }
        catch (err) {
            next(new exceptions_1.UnauthorizedException());
        }
    }
    else {
        next();
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map