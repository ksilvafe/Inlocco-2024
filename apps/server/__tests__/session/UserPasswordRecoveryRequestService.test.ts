import { faker } from "@faker-js/faker";

import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { UserPasswordRecoveryRequestService } from "../../src/api/services/sessions/UserPasswordRecoveryRequestService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { UserNotFoundError } from "../../src/shared/errors/UserNotFoundError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let userCreationService: UserCreationService;
let userPasswordRecoveryRequestService: UserPasswordRecoveryRequestService;

describe("Services :: Session :: User Password Recovery Request", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    userCreationService = new UserCreationService(inMemoryUsersRepository);
    userPasswordRecoveryRequestService = new UserPasswordRecoveryRequestService(
      inMemoryUsersRepository
    );
  });

  it("should be able to request user password recovery", async () => {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const userCreated = await userCreationService.execute(userData);

    const userPasswordRecoveryResponse =
      await userPasswordRecoveryRequestService.execute({
        email: userData.email,
      });

    expect(userPasswordRecoveryResponse).toHaveProperty("cuid");
    expect(userPasswordRecoveryResponse.cuid).toBe(userCreated.cuid);
    expect(userPasswordRecoveryResponse).toHaveProperty("email");
    expect(userPasswordRecoveryResponse.email).toBe(userCreated.email);
    expect(userPasswordRecoveryResponse).toHaveProperty("resetToken");
    expect(userPasswordRecoveryResponse).toHaveProperty("recoveryLink");
  });

  it("should return user not found when email is not found", async () => {
    try {
      await userPasswordRecoveryRequestService.execute({
        email: faker.internet.email(),
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserNotFoundError);
      expect(error.message).toBe("Usuário não encontrado!");
      expect(error.statusCode).toBe(404);
    }
  });
});
