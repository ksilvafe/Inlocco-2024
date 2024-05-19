import { AppError } from "../../shared/errors/AppError";

export class SelfFollowError extends AppError {
  constructor() {
    super("Não é permitido seguir a si mesmo!", 400);
  }
}
