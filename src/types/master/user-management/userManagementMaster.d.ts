declare namespace Master {
  namespace UserManagement {
    interface RoleForm {
      name: string;
    }

    type RoleItem = Data.WithId<RoleForm, 'id', string>;

    interface UserForm {
      userName: string;
      email: string;
      emailConfirmed: boolean;
      passwordHash: string;
      phoneNumber: string;
      phoneNumberConfirmed: boolean;
    }

    type UserItem = Data.WithId<UserForm, 'id', string>;

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
}
