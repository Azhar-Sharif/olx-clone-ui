export interface ApiResponse<T = any> {
  success: boolean;
  message: string | null;
  data: T | null;
  errors: Record<string, any> | string[] | string | null;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, any> | string[] | string;
}
