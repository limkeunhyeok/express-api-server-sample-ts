"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.create = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "keyboard cat";
const create = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
};
exports.create = create;
const verify = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
exports.verify = verify;
//# sourceMappingURL=jwt.js.map