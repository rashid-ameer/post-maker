class ApiError extends Error {
  public status: number;
  public errorCode?: string;

  constructor(
    status: number,
    message: string,
    errorCode?: string,
    stack?: string
  ) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export default ApiError;
