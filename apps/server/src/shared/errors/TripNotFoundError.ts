import { AppError } from "../../shared/errors/AppError";

export class TripNotFoundError extends AppError {
  constructor() {
    super("Viagem não encontrada!", 404);
  }
}
