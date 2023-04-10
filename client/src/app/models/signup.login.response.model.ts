export interface SignupLoginResponseModel {
  access_token: string,
  refresh_token: string;
  statusCode?: number;
  message?: string;
}
