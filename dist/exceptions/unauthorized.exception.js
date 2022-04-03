"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const http_exception_1 = require("./http.exception");
class UnauthorizedException extends http_exception_1.HttpException {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=unauthorized.exception.js.map