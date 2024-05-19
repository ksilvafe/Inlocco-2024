import { Request, Response } from "express";

import { UsersRepository } from "../repositories/users/UsersRepository";
import { UserAuthenticationService } from "../services/sessions/UserAuthenticationService";
import { UserPasswordRecoveryRequestService } from "../services/sessions/UserPasswordRecoveryRequestService";
import { UserPasswordRecoveryService } from "../services/sessions/UserPasswordRecoveryService";
import { UserVerificationRequestService } from "../services/sessions/UserVerificationRequestService";
import { UserVerificationService } from "../services/sessions/UserVerificationService";

export class SessionController {
  async authenticate(request: Request, response: Response) {
    const authorization = request.headers.authorization as string;
    const [, hash] = authorization.split(" ");
    const [email, password] = Buffer.from(hash, "base64").toString().split(":");

    const usersRepository = new UsersRepository();
    const authenticateUser = new UserAuthenticationService(usersRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }

  async requestUserVerification(request: Request, response: Response) {
    const { email } = request.body;

    const usersRepository = new UsersRepository();
    const userVerificationRequestService = new UserVerificationRequestService(
      usersRepository
    );

    const userConfirmCode = await userVerificationRequestService.execute({
      email,
    });

    return response.json(userConfirmCode);
  }

  async verifyUser(request: Request, response: Response) {
    const { confirmationCode } = request.params;

    const usersRepository = new UsersRepository();
    const userVerificationService = new UserVerificationService(
      usersRepository
    );

    await userVerificationService.execute({
      confirmationCode,
    });

    return response.status(204).send();
  }

  async requestUserPasswordRecovery(request: Request, response: Response) {
    const { email } = request.body;

    const usersRepository = new UsersRepository();
    const userPasswordRecoveryRequestService =
      new UserPasswordRecoveryRequestService(usersRepository);

    const userPasswordRecoveryRequest =
      await userPasswordRecoveryRequestService.execute({
        email,
      });

    return response.json(userPasswordRecoveryRequest);
  }

  async recoverUserPassword(request: Request, response: Response) {
    const { cuid, token, password } = request.body;

    const usersRepository = new UsersRepository();
    const userPasswordRecoveryService = new UserPasswordRecoveryService(
      usersRepository
    );

    await userPasswordRecoveryService.execute({ cuid, token, password });

    return response.status(204).send();
  }
}
