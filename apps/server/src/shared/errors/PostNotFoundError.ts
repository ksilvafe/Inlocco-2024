import { AppError } from "../../shared/errors/AppError";

export class PostNotFoundError extends AppError {
  constructor() {
    super("Post não encontrado!", 404);
  }
}
