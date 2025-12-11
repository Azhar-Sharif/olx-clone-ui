export interface ApiResponse {
  success: boolean;
  message: string | null;
  data: any;
  errors: Record<string, any> | string[] | string | null;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, any> | string[] | string;
}
