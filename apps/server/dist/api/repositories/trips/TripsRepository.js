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
exports.TripsRepository = void 0;
const database_1 = require("../../../config/database");
class TripsRepository {
    findByCuid(cuid, include) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield database_1.prisma.trips.findUnique({
                where: {
                    cuid: cuid,
                },
                include,
            });
            return trip;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield database_1.prisma.trips.create({
                data: Object.assign(Object.assign({}, data), { posts: data.posts && {
                        connect: data.posts.map((item) => ({ cuid: item })),
                    } }),
            });
            return trip;
        });
    }
    update(cuid, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const updateTrip = yield database_1.prisma.trips.update({
                where: {
                    cuid,
                },
                data: Object.assign(Object.assign({}, data), { posts: data.posts && {
                        connect: (_a = data.posts) === null || _a === void 0 ? void 0 : _a.map((item) => ({ cuid: item })),
                    } }),
            });
            return updateTrip;
        });
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const trips = yield database_1.prisma.trips.findMany({
                where: Object.assign(Object.assign({}, query), { user: {
                        cuid: query.userCuid,
                    } }),
                include: {
                    user: {
                        include: {
                            profile: true,
                        },
                    },
                    posts: {
                        include: {
                            location: true,
                            travelers: {
                                include: {
                                    user: {
                                        include: {
                                            profile: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    likes: true,
                    comments: true,
                },
            });
            return trips;
        });
    }
}
exports.TripsRepository = TripsRepository;
//# sourceMappingURL=TripsRepository.js.map