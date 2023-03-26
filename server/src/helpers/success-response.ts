export function successResponse<T>(data: T) {
  return {
    satusCode: 200,
    data,
  };
}
