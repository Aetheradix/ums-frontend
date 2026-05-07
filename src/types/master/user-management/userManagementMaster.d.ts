declare namespace Master {
  namespace UserManagement {
    interface UserForm {
      UserName: string;
      Email: string;
      Password: string;
      PhoneNumber: string;
    }

    type UserItem = Data.WithId<UserForm, 'id', string>;

    interface RoleForm {
      name: string;
    }

    type RoleItem = Data.WithId<RoleForm, 'id', string>;

    interface UserRoleMappingForm {
      UserId: string;
      RoleName: string;
    }

    type UserRoleMappingItem = Data.WithId<UserRoleMappingForm>;
  }
}
