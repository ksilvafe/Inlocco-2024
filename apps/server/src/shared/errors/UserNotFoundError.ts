import { AppError } from "../../shared/errors/AppError";

export class UserNotFoundError extends AppError {
  constructor() {
    super("Usuário não encontrado!", 404);
  }
}
