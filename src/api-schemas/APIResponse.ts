export interface APIResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
}
