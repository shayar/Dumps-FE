export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
}

export interface ApiError {
  errors: string;
}
