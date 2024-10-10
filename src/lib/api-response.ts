class ApiResponse {
  public success: boolean;
  public message: string;
  public data: any;

  constructor(message: string, data: any = null) {
    this.message = message;
    this.data = data;
    this.success = true;
  }
}

export default ApiResponse;
