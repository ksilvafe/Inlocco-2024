import { faker } from "@faker-js/faker";
import { UserStatus } from "@prisma/client";

import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { UserVerificationService } from "../../src/api/services/sessions/UserVerificationService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { UserNotFoundError } from "../../src/shared/errors/UserNotFoundError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let userCreationService: UserCreationService;
let userVerificationService: UserVerificationService;

describe("Services :: Session :: User Verification", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    userCreationService = new UserCreationService(inMemoryUsersRepository);
    userVerificationService = new UserVerificationService(
      inMemoryUsersRepository
    );
  });

  it("should be able to user verify", async () => {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const userCreated = await userCreationService.execute(userData);

    const userVerificationResponse = await userVerificationService.execute({
      confirmationCode: userCreated.confirmationCode,
    });

    expect(userCreated.status).toBe(UserStatus.PENDING);
    expect(userVerificationResponse.status).toBe(UserStatus.ACTIVE);
  });

  it("should return user not found when confirmationCode is invalid", async () => {
    try {
      await userVerificationService.execute({
        confirmationCode: faker.lorem.lines(),
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserNotFoundError);
      expect(error.message).toBe("Usuário não encontrado!");
      expect(error.statusCode).toBe(404);
    }
  });
});
