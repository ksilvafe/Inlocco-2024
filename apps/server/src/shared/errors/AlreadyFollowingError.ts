import { AppError } from "../../shared/errors/AppError";

export class AlreadyFollowingError extends AppError {
  constructor() {
    super("Você já está seguindo este usuário!", 400);
  }
}
