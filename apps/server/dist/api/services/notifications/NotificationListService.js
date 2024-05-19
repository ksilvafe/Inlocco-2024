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
exports.NotificationListService = void 0;
const UserNotFoundError_1 = require("../../../shared/errors/UserNotFoundError");
class NotificationListService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ cuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByCuid(cuid, {
                recipientNotifications: {
                    include: {
                        sender: {
                            include: {
                                profile: true,
                            },
                        },
                        trip: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            });
            if (!user) {
                throw new UserNotFoundError_1.UserNotFoundError();
            }
            return user.recipientNotifications;
        });
    }
}
exports.NotificationListService = NotificationListService;
//# sourceMappingURL=NotificationListService.js.map