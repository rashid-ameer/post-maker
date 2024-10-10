class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errorCode?: string,
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
