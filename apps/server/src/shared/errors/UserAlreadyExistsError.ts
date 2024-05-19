import { AppError } from "../../shared/errors/AppError";

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super("Usuário já existe");
  }
}
