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
exports.TripShowService = void 0;
const TripNotFoundError_1 = require("../../../shared/errors/TripNotFoundError");
class TripShowService {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute({ cuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield this.tripsRepository.findByCuid(cuid, {
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
                        saves: true,
                    },
                },
                user: {
                    include: {
                        profile: {
                            include: {
                                address: true,
                            },
                        },
                    },
                },
                saves: true,
                comments: {
                    include: {
                        user: true,
                    },
                },
                likes: true,
            });
            if (!trip) {
                throw new TripNotFoundError_1.TripNotFoundError();
            }
            return trip;
        });
    }
}
exports.TripShowService = TripShowService;
//# sourceMappingURL=TripShowService.js.map