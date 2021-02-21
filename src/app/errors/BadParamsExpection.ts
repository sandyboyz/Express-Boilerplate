import HttpException, { HttpData } from './HttpExpection';

export default class BadParamsException extends HttpException {
  constructor(message: string, data?: HttpData) {
    super(400, message, data);
    this.name = 'Bad Request Params';
  }
}
