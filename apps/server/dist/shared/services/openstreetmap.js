"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOST = exports.openstreetmap = void 0;
const axios_1 = __importDefault(require("axios"));
const HOST = "https://nominatim.openstreetmap.org";
exports.HOST = HOST;
const openstreetmap = axios_1.default.create({
    baseURL: `${HOST}`,
});
exports.openstreetmap = openstreetmap;
//export default api;
//# sourceMappingURL=openstreetmap.js.map