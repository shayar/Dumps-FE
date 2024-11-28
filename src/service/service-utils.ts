import { ApiError } from "@dumps/api-schemas/APIResponse";
import { toastFail } from "./service-toast";

export const handleApiError = (error: unknown) => {
  const err = error as ApiError;
  if ('errors' in err) {
    toastFail(err.errors);
  } else {
    toastFail('An unexpected error occurred');
  }
};