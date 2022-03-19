export class Response {
  public success: boolean
  public response?: any
  public err?: Error
  
  constructor(success: boolean) {
    this.success = success;
  }

  public data(data: any) {
    this.response = data;
    return this;
  }

  public error(error: Error) {
    this.err = error;
    return this;
  }

  public toJson() {
    return {
      success: this.success,
      response: this.response,
      error: this.err
    }
  }
}