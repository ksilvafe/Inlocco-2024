import { AppError } from "../../shared/errors/AppError";

export class LocationNotFoundError extends AppError {
  constructor() {
    super("Localiza não encontrado!", 404);
  }
}
