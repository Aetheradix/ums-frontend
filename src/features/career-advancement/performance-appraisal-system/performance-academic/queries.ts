import { useMutation } from '@tanstack/react-query';
import { createAcademicDetail, updateAcademicDetail } from './api';
import { ToastService } from 'services';

export const useCreateAcademicDetail = () => {
  return useMutation({
    mutationFn: (payload: CareerAdvancement.CreateAcademicDetailPayload) =>
      createAcademicDetail(payload),
    onSuccess: () => {
      ToastService.success('Academic detail created successfully');
    },
    onError: error => {
      ToastService.error(error.message || 'Failed to create academic detail');
    },
  });
};

export const useUpdateAcademicDetail = () => {
  return useMutation({
    mutationFn: (payload: CareerAdvancement.UpdateAcademicDetailPayload) =>
      updateAcademicDetail(payload),
    onSuccess: () => {
      ToastService.success('Academic detail updated successfully');
    },
    onError: error => {
      ToastService.error(error.message || 'Failed to update academic detail');
    },
  });
};
