/**
 * Session Response DTO from backend API
 */
export interface SessionResponseDto {
  id: number;
  sessionName: string;
  sessionType: string;
  startDateTime: string;
  endDateTime: string;
  appStatus: string;
  sessionFrom: string;
  sessionTo: string;
  isActive: boolean;
  createdOn: string;
  createdBy: string;
  ipAddress: string;
}

/**
 * Create Session Command - sent to backend
 */
export interface CreateSessionCommand {
  sessionName: string;
  sessionType: string;
  startDateTime: string;
  endDateTime: string;
  appStatus: string;
  sessionFrom: string;
  sessionTo: string;
}

/**
 * Update Session Command - sent to backend
 */
export interface UpdateSessionCommand {
  sessionName: string;
  sessionType: string;
  startDateTime: string;
  endDateTime: string;
  appStatus: string;
  sessionFrom: string;
  sessionTo: string;
}

/**
 * Internal form shape used by react-hook-form
 */
export interface SessionFormData {
  sessionName: string;
  sessionType: string;
  startDateTime: Date | null;
  endDateTime: Date | null;
  appStatus: string;
  sessionFrom: Date | null;
  sessionTo: Date | null;
  isActive?: boolean;
}

/**
 * Session Type Options
 */
export const SESSION_TYPES = [
  { label: 'Regular', value: 'Regular' },
  { label: 'Special', value: 'Special' },
  { label: 'Supplementary', value: 'Supplementary' },
];

/**
 * App Status Options
 */
export const APP_STATUS_OPTIONS = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Closed', value: 'Closed' },
];
