// src/utils/index.ts

interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  timestamp: string;
}

interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

/**
 * Formats a successful API response
 * @param data The data to be returned
 * @param message Optional success message
 */
export const formatResponse = <T>(data: T, message = 'Success'): ApiResponse<T> => {
  return {
    status: 'success',
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

/**
 * Handles and formats API errors
 * @param error The error to be handled
 */
export const handleError = (error: unknown): ApiResponse<never> => {
  const apiError = error as ApiError;
  
  // Log error for debugging
  console.error('[Error]:', {
    message: apiError.message,
    stack: apiError.stack,
    details: apiError.details
  });

  return {
    status: 'error',
    message: apiError.message || 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  };
};

/**
 * Validates if a value is not null or undefined
 * @param value Value to check
 * @param name Name of the value for error message
 */
export const validateRequired = <T>(value: T | null | undefined, name: string): T => {
  if (value === null || value === undefined) {
    throw new Error(`${name} is required`);
  }
  return value;
};