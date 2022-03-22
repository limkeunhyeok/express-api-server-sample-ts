export class Response {
  public success: boolean
  public response?: any
  public message?: string
  
  constructor(success: boolean) {
    this.success = success;
  }

  public data(data: any) {
    this.response = data;
    return this;
  }

  public error(message: string) {
    this.message = message;
    return this;
  }

  public toJson() {
    return {
      success: this.success,
      response: this.response,
      error: this.message
    }
  }
}