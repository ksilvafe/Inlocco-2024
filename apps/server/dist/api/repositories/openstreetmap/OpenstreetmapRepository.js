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
exports.OpenstreetmapRepository = void 0;
const openstreetmap_1 = require("../../../shared/services/openstreetmap");
class OpenstreetmapRepository {
    reverse(lat, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
                const response = yield openstreetmap_1.openstreetmap.get(url);
                const data = {
                    lat: response.data.lat,
                    lng: response.data.lon,
                    displayName: response.data.display_name,
                    country: response.data.address.country,
                    countryCode: response.data.address.country_code,
                    city: response.data.address.city,
                };
                return data;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `/search?format=json&q=${query}&limit=2&addressdetails=1`;
                const response = yield openstreetmap_1.openstreetmap.get(url);
                return response.data;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.OpenstreetmapRepository = OpenstreetmapRepository;
//# sourceMappingURL=OpenstreetmapRepository.js.map