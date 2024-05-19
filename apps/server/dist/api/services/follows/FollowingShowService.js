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
exports.FollowingShowService = void 0;
const UserNotFoundError_1 = require("../../../shared/errors/UserNotFoundError");
class FollowingShowService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ cuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFollowers = yield this.usersRepository.findByCuid(cuid, {
                followers: {
                    include: {
                        following: {
                            include: {
                                profile: true,
                            },
                        },
                        follower: true,
                    },
                },
            });
            if (!userFollowers) {
                throw new UserNotFoundError_1.UserNotFoundError();
            }
            return userFollowers.followers;
        });
    }
}
exports.FollowingShowService = FollowingShowService;
//# sourceMappingURL=FollowingShowService.js.map