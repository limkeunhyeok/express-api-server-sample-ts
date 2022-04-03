"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const http_exception_1 = require("./http.exception");
class NotFoundException extends http_exception_1.HttpException {
    constructor(message = "Not found") {
        super(404, message);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map