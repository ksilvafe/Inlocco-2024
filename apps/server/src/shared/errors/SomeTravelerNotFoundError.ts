import { AppError } from "../../shared/errors/AppError";

export class SomeTravelerNotFoundError extends AppError {
  constructor() {
    super("Algum viajante não foi encontrado!", 404);
  }
}
