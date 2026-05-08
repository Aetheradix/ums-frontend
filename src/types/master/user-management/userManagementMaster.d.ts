declare namespace Master {
  namespace UserManagement {
    interface RoleForm {
      name: string;
    }

    type RoleItem = Data.WithId<RoleForm, 'id', string>;
  }
}
