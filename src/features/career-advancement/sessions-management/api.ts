import { ApiService } from 'services';
import type {
  CreateSessionCommand,
  SessionResponseDto,
  UpdateSessionCommand,
} from './types';
import { SESSIONS_MANAGEMENT_BASE_URL } from './urls';

/**
 * Fetch all sessions
 */
export function getSessions() {
  return ApiService.getList<SessionResponseDto>(SESSIONS_MANAGEMENT_BASE_URL);
}

/**
 * Fetch session by ID
 */
export async function getSessionById(
  id: number
): Promise<SessionResponseDto | undefined> {
  const { error, data } = await ApiService.get<SessionResponseDto>(
    `${SESSIONS_MANAGEMENT_BASE_URL}/${id}`
  );

  return !error ? data : undefined;
}

/**
 * Create new session
 */
export async function createSession(
  command: CreateSessionCommand
): Promise<SessionResponseDto | undefined> {
  const { error, data } = await ApiService.post<SessionResponseDto>(
    SESSIONS_MANAGEMENT_BASE_URL,
    command
  );

  return !error ? data : undefined;
}

/**
 * Update existing session
 */
export async function updateSession(
  id: number,
  command: UpdateSessionCommand
): Promise<boolean> {
  const { error } = await ApiService.put<{ value: number }>(
    `${SESSIONS_MANAGEMENT_BASE_URL}/${id}`,
    command
  );

  return !error;
}

/**
 * Toggle session active status
 */
export async function patchSessionStatus(id: number): Promise<boolean> {
  const { error } = await ApiService.patch(
    `${SESSIONS_MANAGEMENT_BASE_URL}/${id}/status`,
    {}
  );

  return !error;
}

/**
 * Delete session
 */
export async function deleteSession(id: number): Promise<boolean> {
  const { error } = await ApiService.del<{ value: number }>(
    `${SESSIONS_MANAGEMENT_BASE_URL}/${id}`
  );

  return !error;
}
