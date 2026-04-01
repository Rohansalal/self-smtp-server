"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
function createContext(opts) {
    const headers = opts?.req.headers;
    return {
        headers,
        env: process.env,
    };
}
//# sourceMappingURL=context.js.map