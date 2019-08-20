export class HttpError{
  message: any;
  statusCode: number;

  constructor(message, statusCode){
    this.message = message;
    this.statusCode = statusCode;
  }
}