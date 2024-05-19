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
exports.InMemoryTripsRepository = void 0;
class InMemoryTripsRepository {
    constructor() {
        this.trips = [];
    }
    findByCuid(cuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.trips.find((trip) => trip.cuid === cuid);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = {
                cuid: `${this.trips.length}`,
            };
            Object.assign(trip, data);
            this.trips.push(trip);
            return trip;
        });
    }
    update(cuid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateTrip = yield this.findByCuid(cuid);
            const updatedTrip = Object.assign(Object.assign({}, updateTrip), data);
            this.trips[updateTrip.cuid] = updatedTrip;
            return updatedTrip;
        });
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.trips;
        });
    }
}
exports.InMemoryTripsRepository = InMemoryTripsRepository;
//# sourceMappingURL=InMemoryTripsRepository.js.map