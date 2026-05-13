declare namespace Master.UserManagement {
  interface UserItem {
    id: string;
    userName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed: boolean;
    isActive: boolean;
  }

  interface UserForm {
    userName: string;
    email: string;
    emailConfirmed: boolean;
    passwordHash?: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
  }

  interface RoleItem {
    id: string;
    name: string;
    isActive: boolean;
  }

  interface RoleForm {
    name: string;
  }

  interface UserRoleMappingForm {
    userId: string;
    roleName: string;
  }

  interface RoleFeatureMappingForm {
    roleName: string;
    featureName: string;
    action: string;
  }
}
