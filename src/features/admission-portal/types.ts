export interface SendOtpResponse {
  message?: string;
}

export interface VerifyOtpResponse {
  value?: string;
}

export interface SessionInfo {
  email: string;
}
