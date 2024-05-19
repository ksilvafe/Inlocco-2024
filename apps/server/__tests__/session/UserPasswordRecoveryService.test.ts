import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { UserAuthenticationService } from "../../src/api/services/sessions/UserAuthenticationService";
import { UserPasswordRecoveryRequestService } from "../../src/api/services/sessions/UserPasswordRecoveryRequestService";
import { UserPasswordRecoveryService } from "../../src/api/services/sessions/UserPasswordRecoveryService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import env from "../../src/config/env";
import { IncorrectEmailOrPasswordError } from "../../src/shared/errors/IncorrectEmailOrPasswordError";
import { InvalidTokenError } from "../../src/shared/errors/InvalidTokenError";
import { UserNotFoundError } from "../../src/shared/errors/UserNotFoundError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let userCreationService: UserCreationService;
let userAuthenticationService: UserAuthenticationService;
let userPasswordRecoveryRequestService: UserPasswordRecoveryRequestService;
let userPasswordRecoveryService: UserPasswordRecoveryService;

describe("Services :: Session :: User Password Recovery", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    userCreationService = new UserCreationService(inMemoryUsersRepository);
    userAuthenticationService = new UserAuthenticationService(
      inMemoryUsersRepository
    );
    userPasswordRecoveryRequestService = new UserPasswordRecoveryRequestService(
      inMemoryUsersRepository
    );
    userPasswordRecoveryService = new UserPasswordRecoveryService(
      inMemoryUsersRepository
    );
  });

  it("should be able to user recovery password", async () => {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const userCreated = await userCreationService.execute(userData);

    const userRequestRecovery =
      await userPasswordRecoveryRequestService.execute({
        email: userCreated.email,
      });

    const newPassword = faker.internet.password();
    const userRecoveryResponse = await userPasswordRecoveryService.execute({
      cuid: userRequestRecovery.cuid,
      token: userRequestRecovery.resetToken,
      password: newPassword,
    });

    const authWithNewPassword = await userAuthenticationService.execute({
      email: userData.email,
      password: newPassword,
    });

    expect(userRecoveryResponse.resetToken).toBe("");
    expect(authWithNewPassword).toHaveProperty("token");
    expect(authWithNewPassword).toHaveProperty("token");
  });

  it("should return Error when user cuid is invalid", async () => {
    try {
      // criar usuario
      const userData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const userCreated = await userCreationService.execute(userData);

      // enviar requisição de recuperação de senha
      const userRequestRecovery =
        await userPasswordRecoveryRequestService.execute({
          email: userCreated.email,
        });

      // tentar recuperar de senha
      await userPasswordRecoveryService.execute({
        cuid: "cuid",
        token: userRequestRecovery.resetToken,
        password: faker.internet.password(),
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserNotFoundError);
      expect(error.message).toBe("Usuário não encontrado!");
      expect(error.statusCode).toBe(404);
    }
  });

  it("should return Error when user dont request recovery", async () => {
    try {
      const userData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const userCreated = await userCreationService.execute(userData);

      const resetToken = crypto.randomBytes(32).toString("hex");
      const hash = await bcrypt.hash(resetToken, env.salt);

      await userPasswordRecoveryService.execute({
        cuid: userCreated.cuid,
        token: hash,
        password: faker.internet.password(),
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidTokenError);
      expect(error.message).toBe("Token inválido ou expirado!");
      expect(error.statusCode).toBe(401);
    }
  });

  it("should return Error when password not match", async () => {
    try {
      const userData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const userCreated = await userCreationService.execute(userData);

      const userPasswordRecoveryRequestResponse =
        await userPasswordRecoveryRequestService.execute({
          email: userCreated.email,
        });

      const userPasswordRecoveryResponse =
        await userPasswordRecoveryService.execute({
          cuid: userPasswordRecoveryRequestResponse.cuid,
          token: userPasswordRecoveryRequestResponse.resetToken,
          password: faker.internet.password(),
        });

      expect(userPasswordRecoveryResponse.resetToken).toBe("");

      await userAuthenticationService.execute({
        email: userData.email,
        password: userData.password,
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(IncorrectEmailOrPasswordError);
      expect(error.message).toBe("Email ou Senha inválido");
      expect(error.statusCode).toBe(401);
    }
  });
});
