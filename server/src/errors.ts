export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public field: string = "_global",
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ConflictError extends AppError {
  constructor(field: string, message: string) {
    super(message, 409, field);
  }
}
