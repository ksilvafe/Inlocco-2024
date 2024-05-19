import { faker } from "@faker-js/faker";

import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { UserVerificationRequestService } from "../../src/api/services/sessions/UserVerificationRequestService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { UserNotFoundError } from "../../src/shared/errors/UserNotFoundError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let userCreationService: UserCreationService;
let userVerificationRequestService: UserVerificationRequestService;

describe("Services :: Session :: User Verification Request", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    userCreationService = new UserCreationService(inMemoryUsersRepository);
    userVerificationRequestService = new UserVerificationRequestService(
      inMemoryUsersRepository
    );
  });

  it("should be able to request user verify", async () => {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const userCreated = await userCreationService.execute(userData);

    const userVerificationResponse =
      await userVerificationRequestService.execute({
        email: userData.email,
      });

    expect(userVerificationResponse).toHaveProperty("cuid");
    expect(userVerificationResponse.cuid).toBe(userCreated.cuid);
    expect(userVerificationResponse).toHaveProperty("confirmationCode");
    expect(userVerificationResponse.confirmationCode).toBe(
      userCreated.confirmationCode
    );
    expect(userVerificationResponse).toHaveProperty("email");
    expect(userVerificationResponse.email).toBe(userCreated.email);
    expect(userVerificationResponse).toHaveProperty("confirmationLink");
  });

  it("should return user not found when email is not found", async () => {
    try {
      await userVerificationRequestService.execute({
        email: faker.internet.email(),
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserNotFoundError);
      expect(error.message).toBe("Usuário não encontrado!");
      expect(error.statusCode).toBe(404);
    }
  });
});
