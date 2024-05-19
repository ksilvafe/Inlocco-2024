import { faker } from "@faker-js/faker";

import { InMemoryNotificationsRepository } from "../../src/api/repositories/notifications/in-memory/InMemoryNotificationsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { NotificationCreationService } from "../../src/api/services/notifications/NotificationCreationService";
import { NotificationListService } from "../../src/api/services/notifications/NotificationListService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";

let notificationsRepository: InMemoryNotificationsRepository;
let notificationCreationService: NotificationCreationService;
let notificationListService: NotificationListService;
let usersRepository: InMemoryUsersRepository;
let userCreationService: UserCreationService;

describe("Services :: Notifications :: Notification List", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    notificationsRepository = new InMemoryNotificationsRepository(
      usersRepository
    );
    notificationCreationService = new NotificationCreationService(
      notificationsRepository
    );
    notificationListService = new NotificationListService(usersRepository);
    userCreationService = new UserCreationService(usersRepository);
  });

  it("should be able to list a notification", async () => {
    const userCreated = await userCreationService.execute({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const userCreated2 = await userCreationService.execute({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const notification = {
      title: "title",
      message: "message",
      senderId: userCreated.cuid,
      recipientId: userCreated2.cuid,
      postId: 1,
    };

    await notificationCreationService.execute(notification);
    const notificationList = await notificationListService.execute({
      cuid: userCreated2.cuid,
    });
    expect(notificationList.length).toBe(1);
  });
});
