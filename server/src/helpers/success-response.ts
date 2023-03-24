export function successResponse<T>(data: T) {
  return {
    success: true,
    data,
  };
}
