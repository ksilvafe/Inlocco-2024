import { faker } from "@faker-js/faker";

import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { UserShowService } from "../../src/api/services/users/UserShowService";
import { UserNotFoundError } from "../../src/shared/errors/UserNotFoundError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let userShowService: UserShowService;
let userCreationService: UserCreationService;

describe("Services :: Users :: Show User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    userCreationService = new UserCreationService(inMemoryUsersRepository);
    userShowService = new UserShowService(inMemoryUsersRepository);
  });

  it("should be able show an user profile", async () => {
    const userCreated = await userCreationService.execute({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const userProfile = await userShowService.execute({
      cuid: userCreated.cuid,
    });

    expect(userProfile).toHaveProperty("cuid");

    expect(userProfile.name).toBe(userCreated.name);
    expect(userProfile.email).toBe(userCreated.email);
  });

  it("should return user not found when cuid is invalid", async () => {
    try {
      await userShowService.execute({ cuid: "invalid_cuid" });
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserNotFoundError);
      expect(error.message).toBe("Usuário não encontrado!");
      expect(error.statusCode).toBe(404);
    }
  });
});
