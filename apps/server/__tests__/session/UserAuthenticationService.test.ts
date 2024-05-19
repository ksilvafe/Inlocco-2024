import { faker } from "@faker-js/faker";

import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { UserAuthenticationService } from "../../src/api/services/sessions/UserAuthenticationService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { IncorrectEmailOrPasswordError } from "../../src/shared/errors/IncorrectEmailOrPasswordError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let userCreationService: UserCreationService;
let userAuthenticationService: UserAuthenticationService;

describe("Services :: Session :: User Authentication", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    userCreationService = new UserCreationService(inMemoryUsersRepository);
    userAuthenticationService = new UserAuthenticationService(
      inMemoryUsersRepository
    );
  });

  it("should be able to authenticate user", async () => {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const userCreated = await userCreationService.execute(userData);

    const authorization = await userAuthenticationService.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(authorization).toHaveProperty("token");
    expect(authorization).toHaveProperty("user");

    expect(authorization.user).toHaveProperty("cuid");
    expect(authorization.user.cuid).toBe(userCreated.cuid);
    expect(authorization.user).toHaveProperty("name");
    expect(authorization.user.name).toBe(userCreated.name);
    expect(authorization.user).toHaveProperty("email");
    expect(authorization.user.email).toBe(userCreated.email);
  });

  it("should return incorrect email or password when email is not found", async () => {
    try {
      await userAuthenticationService.execute({
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(IncorrectEmailOrPasswordError);
      expect(error.message).toBe("Email ou Senha inválido");
      expect(error.statusCode).toBe(401);
    }
  });

  it("should return incorrect email or password when password not match", async () => {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await userCreationService.execute(userData);

    try {
      await userAuthenticationService.execute({
        email: userData.email,
        password: "batatinha frita",
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(IncorrectEmailOrPasswordError);
      expect(error.message).toBe("Email ou Senha inválido");
      expect(error.statusCode).toBe(401);
    }
  });
});
