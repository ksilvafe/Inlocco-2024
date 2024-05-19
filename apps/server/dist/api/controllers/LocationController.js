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
exports.LocationController = void 0;
const OpenstreetmapRepository_1 = require("../repositories/openstreetmap/OpenstreetmapRepository");
const LocationReverseService_1 = require("../services/locations/LocationReverseService");
const LocationSearchService_1 = require("../services/locations/LocationSearchService");
class LocationController {
    reverse(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lat, lng } = request.query;
            const openstreetmapRepository = new OpenstreetmapRepository_1.OpenstreetmapRepository();
            const showLocation = new LocationReverseService_1.LocationReverseService(openstreetmapRepository);
            const location = yield showLocation.execute({
                lat,
                lng,
            });
            return response.json(location);
        });
    }
    search(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q } = request.query;
            const openstreetmapRepository = new OpenstreetmapRepository_1.OpenstreetmapRepository();
            const showLocation = new LocationSearchService_1.LocationSearchService(openstreetmapRepository);
            const location = yield showLocation.execute({
                q,
            });
            return response.json(location);
        });
    }
}
exports.LocationController = LocationController;
//# sourceMappingURL=LocationController.js.map