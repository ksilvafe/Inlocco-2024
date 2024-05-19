import { InMemoryNotificationsRepository } from "../../src/api/repositories/notifications/in-memory/InMemoryNotificationsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { NotificationCreationService } from "../../src/api/services/notifications/NotificationCreationService";

let notificationsRepository: InMemoryNotificationsRepository;
let notificationCreationService: NotificationCreationService;
let usersRepository: InMemoryUsersRepository;

describe("Services :: Notifications :: Notification Creation", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    notificationsRepository = new InMemoryNotificationsRepository(
      usersRepository
    );
    notificationCreationService = new NotificationCreationService(
      notificationsRepository
    );
  });

  it("should be able to create a new notification", async () => {
    const notification = {
      title: "title",
      message: "message",
      senderId: 1,
      recipientId: 2,
      postId: 1,
    };

    const notificationCreated = await notificationCreationService.execute(
      notification
    );
    expect(notificationCreated).toHaveProperty("cuid");
  });
});
