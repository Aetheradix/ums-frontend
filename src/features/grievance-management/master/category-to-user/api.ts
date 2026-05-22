import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const CATEGORY_TO_USER_URL = `${MASTER_API_ROOT}categoriesToUserMapping`;

interface CategoryToUserResponse {
  categoryId: string; // stores roleId as string in Casbin
  userId: string;
}

export async function getCategoryToUserMappings(): Promise<
  Grievance.CategoryToUserMappingItem[]
> {
  const response =
    await ApiService.get<CategoryToUserResponse[]>(CATEGORY_TO_USER_URL);
  const data = response.data ?? [];

  return data.map((x, index) => ({
    id: index + 1,
    categoryId: parseInt(x.categoryId, 10),
    userId: x.userId,
  }));
}

export async function getCategoryToUserMappingByPolicy(
  categoryId: number,
  userId: string
): Promise<Grievance.CategoryToUserMappingForm> {
  const response = await ApiService.get<CategoryToUserResponse>(
    `${CATEGORY_TO_USER_URL}/GetFilteredPolicy?role=${categoryId}&feature=${userId}`
  );

  const data = response.data;

  if (!data) {
    throw new Error('Category to user mapping not found');
  }

  return {
    categoryId: parseInt(data.categoryId, 10),
    userId: data.userId,
  };
}

export async function createCategoryToUserMapping(
  data: Grievance.CategoryToUserMappingForm
): Promise<Grievance.CategoryToUserMappingForm> {
  const payload = {
    categoryId: data.categoryId.toString(),
    userId: data.userId,
  };

  const { error, data: result } = await ApiService.post<CategoryToUserResponse>(
    CATEGORY_TO_USER_URL,
    payload
  );

  if (error || !result) {
    throw new Error('Creation failed');
  }

  return {
    categoryId: parseInt(result.categoryId, 10),
    userId: result.userId,
  };
}

export async function updateCategoryToUserMapping(
  oldValues: Grievance.CategoryToUserMapping,
  newValues: Grievance.CategoryToUserMappingForm
): Promise<boolean> {
  const payload = {
    oldCategoryId: oldValues.categoryId.toString(),
    oldUserId: oldValues.userId,
    newCategoryId: newValues.categoryId.toString(),
    newUserId: newValues.userId,
  };

  const { error } = await ApiService.post(
    `${CATEGORY_TO_USER_URL}/update`,
    payload
  );

  if (error) {
    throw new Error('Update failed');
  }

  return true;
}
