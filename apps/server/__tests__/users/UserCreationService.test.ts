import { faker } from "@faker-js/faker";

import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { UserAlreadyExistsError } from "../../src/shared/errors/UserAlreadyExistsError";

let usersRepository: InMemoryUsersRepository;
let userCreationService: UserCreationService;

describe("Services :: Users :: User Creation", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userCreationService = new UserCreationService(usersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await userCreationService.execute(user);

    expect(userCreated).toHaveProperty("cuid");

    expect(userCreated.username).toBe(user.username);
    expect(userCreated.email).toBe(user.email);
  });

  it("should not be able to create a new user with an email already registered", async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await userCreationService.execute(user);

    try {
      await userCreationService.execute(user);
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserAlreadyExistsError);
      expect(error.message).toBe("Usuário já existe");
      expect(error.statusCode).toBe(400);
    }
  });
});
