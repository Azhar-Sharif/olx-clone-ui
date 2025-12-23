export interface IApiResponse {
  success: boolean;
  message: string | null;
  data: any;
  errors: Record<string, any> | string[] | string | null;
}

export interface IApiError {
  message: string;
  status: number;
  errors?: Record<string, any> | string[] | string;
}
