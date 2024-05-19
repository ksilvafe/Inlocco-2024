import { AppError } from "../../shared/errors/AppError";

export class PostDontBelongUserError extends AppError {
  constructor() {
    super("Post não pertence ao usuario!", 400);
  }
}
