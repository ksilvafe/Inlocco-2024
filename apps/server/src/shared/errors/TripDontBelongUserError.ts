import { AppError } from "../../shared/errors/AppError";

export class TripDontBelongUserError extends AppError {
  constructor() {
    super("Viagem não pertence ao usuario!", 400);
  }
}
