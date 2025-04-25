// src/utils/index.ts

export const formatResponse = (data: any, message: string = 'Success') => {
  return {
    status: 'success',
    message,
    data,
  };
};

export const handleError = (error: any) => {
  console.error(error);
  return {
    status: 'error',
    message: error.message || 'An unexpected error occurred',
  };
};