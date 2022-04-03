"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(success) {
        this.success = success;
    }
    data(data) {
        this.response = data;
        return this;
    }
    error(message) {
        this.message = message;
        return this;
    }
    toJson() {
        return {
            success: this.success,
            response: this.response,
            error: this.message
        };
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map