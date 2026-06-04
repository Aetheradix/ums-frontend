import { ApiService } from 'services';

const BASE_URL = 'admission';

export async function sendOtp(email: string) {
  return ApiService.post(`${BASE_URL}/send-otp`, { email });
}

export async function verifyOtp(email: string, otp: string) {
  const apiRoot = ApiService.getApiRoot();
  const response = await fetch(`${apiRoot}${BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.title || result.detail || 'OTP verification failed');
  }
  return result;
}

export async function getSessionInfo(token: string) {
  const apiRoot = ApiService.getApiRoot();
  const response = await fetch(`${apiRoot}${BASE_URL}/protected/session`, {
    headers: { 'X-Admission-Token': token },
  });
  if (!response.ok) throw new Error('Session expired');
  return response.json();
}
