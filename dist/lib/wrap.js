"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = void 0;
const response_1 = require("./response");
const wrap = (handler) => async (req, res, next) => {
    try {
        const result = await handler(req, res, next);
        const response = new response_1.Response(true).data(result).toJson();
        res.json(response);
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.wrap = wrap;
//# sourceMappingURL=wrap.js.map