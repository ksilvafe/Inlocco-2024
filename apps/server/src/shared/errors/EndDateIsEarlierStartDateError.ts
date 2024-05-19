import { AppError } from "../../shared/errors/AppError";

export class EndDateIsEarlierStartDateError extends AppError {
  constructor() {
    super("Data final é anterior a Data inicial", 400);
  }
}
