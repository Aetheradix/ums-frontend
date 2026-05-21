import { ApiService } from 'services';
import type { CreateApplicationCommand } from './types';
import { STUDENT_APPLICATION_URL } from './urls';

export async function createApplication(form: CreateApplicationCommand) {
  const { error, data } = await ApiService.post<{ value: number }>(
    STUDENT_APPLICATION_URL,
    form
  );

  return !error ? data : undefined;
}
