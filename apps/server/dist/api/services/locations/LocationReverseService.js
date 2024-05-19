"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationReverseService = void 0;
const LocationNotFoundError_1 = require("../../../shared/errors/LocationNotFoundError");
class LocationReverseService {
    constructor(openstreetmapRepository) {
        this.openstreetmapRepository = openstreetmapRepository;
    }
    execute({ lat, lng }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lat || !lng) {
                throw new LocationNotFoundError_1.LocationNotFoundError();
            }
            const reverse = yield this.openstreetmapRepository.reverse(parseFloat(lat), parseFloat(lng));
            if (!reverse) {
                throw new LocationNotFoundError_1.LocationNotFoundError();
            }
            return reverse;
        });
    }
}
exports.LocationReverseService = LocationReverseService;
//# sourceMappingURL=LocationReverseService.js.map