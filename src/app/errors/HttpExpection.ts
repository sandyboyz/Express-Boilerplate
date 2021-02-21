/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpData = Record<string, unknown> | null;

class HttpExpection extends Error {
  statusCode: number;
  data: HttpData;
  constructor(statusCode: number, message: string, data?: HttpData) {
    super(message);
    this.name = 'HttpExpection';
    this.statusCode = statusCode;
    this.data = data || null;
  }
}

export default HttpExpection;
