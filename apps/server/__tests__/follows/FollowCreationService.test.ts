import { faker } from "@faker-js/faker";

import { InMemoryFollowsRepository } from "../../src/api/repositories/follows/in-memory/InMemoryFollowsRepository";
import { InMemoryNotificationsRepository } from "../../src/api/repositories/notifications/in-memory/InMemoryNotificationsRepository";
import { NotificationsRepository } from "../../src/api/repositories/notifications/NotificationsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { FollowCreationService } from "../../src/api/services/follows/FollowCreationService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { AlreadyFollowingError } from "../../src/shared/errors/AlreadyFollowingError";
import { SelfFollowError } from "../../src/shared/errors/SelfFollowError";

let followsRepository: InMemoryFollowsRepository;
let followCreationService: FollowCreationService;
let usersRepository: InMemoryUsersRepository;
let notificationsRepository: InMemoryNotificationsRepository;
let userCreationService: UserCreationService;

describe("Services :: Follows :: Follow Creation", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    followsRepository = new InMemoryFollowsRepository(usersRepository);
    notificationsRepository = new InMemoryNotificationsRepository(
      usersRepository
    );
    followCreationService = new FollowCreationService(
      followsRepository,
      usersRepository,
      notificationsRepository
    );
    userCreationService = new UserCreationService(usersRepository);
  });

  it("should be able to create a new follow", async () => {
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

    const followCreated = await followCreationService.execute({
      followerCuid: `${userCreated.cuid}`,
      followingCuid: `${userCreated2.cuid}`,
    });
    expect(followCreated).toHaveProperty("cuid");
  });

  it("should not be able to follow yourself", async () => {
    const userCreated = await userCreationService.execute({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    try {
      await followCreationService.execute({
        followerCuid: `${userCreated.cuid}`,
        followingCuid: `${userCreated.cuid}`,
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(SelfFollowError);
      expect(error.message).toBe("Não é permitido seguir a si mesmo!");
      expect(error.statusCode).toBe(400);
    }
  });

  it("should not be able to follow user you already follow", async () => {
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

    const followCreated = await followCreationService.execute({
      followerCuid: `${userCreated.cuid}`,
      followingCuid: `${userCreated2.cuid}`,
    });

    expect(followCreated).toHaveProperty("cuid");
    try {
      await followCreationService.execute({
        followerCuid: `${userCreated.cuid}`,
        followingCuid: `${userCreated2.cuid}`,
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(AlreadyFollowingError);
      expect(error.message).toBe("Você já está seguindo este usuário!");
      expect(error.statusCode).toBe(400);
    }
  });
});
