export class ApiResponse {
  status: number;
  message: string;
  success: boolean;
  data?: any;

  constructor(status: number, message: string, data?: any) {
    this.message = message;
    this.success = status >= 200 && status < 300;
    this.status = status;
    if (data !== null && data !== undefined) this.data = data;
  }
}
