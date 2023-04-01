export interface IExceptionFilter {
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
}
