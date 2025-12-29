export interface IApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}