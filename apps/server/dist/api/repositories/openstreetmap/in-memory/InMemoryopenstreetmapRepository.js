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
exports.InMemoryopenstreetmapRepository = void 0;
class InMemoryopenstreetmapRepository {
    reverse(lat, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    displayName: "Ditsch, Lindower Straße, Sprengelkiez, Wedding, Mitte, Berlim, 13347, Alemanha",
                    lat: "52.54274275",
                    lng: "13.36690305710228",
                    city: "Berlim",
                    country: "Alemanha",
                    countryCode: "ger",
                };
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
                return [
                    {
                        displayName: "Ditsch, Lindower Straße, Sprengelkiez, Wedding, Mitte, Berlim, 13347, Alemanha",
                        lat: "52.54274275",
                        lng: "13.36690305710228",
                        city: "Berlim",
                        country: "Alemanha",
                        countryCode: "ger",
                    },
                ];
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.InMemoryopenstreetmapRepository = InMemoryopenstreetmapRepository;
//# sourceMappingURL=InMemoryopenstreetmapRepository.js.map