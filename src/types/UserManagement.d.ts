declare namespace UserManagement {
  interface UserRoleBase {
    name: string;
    description: string;
  }
  type UserRoleForm = UserRoleBase;
  interface UserRoleList extends UserRoleBase {
    id: string;
  }
  interface UserBase {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  type UserForm = UserBase;
  interface UserList extends UserBase {
    id: string;
  }

  // Features Dropdown
  interface FeatureItem {
    name: string;
    value: string;
  }

  // Rights Dropdown
  interface RightItem {
    name: string;
    value: string;
  }

  // Role Permissions
  interface RolePermissionBase {
    roleName: string;
    domain: string;
    feature: string;
  }
  interface RolePermissionCreate {
    roleName: string;
    domain: string;
    feature: string[];
    action: string;
  }
  interface RolePermissionList extends RolePermissionBase {
    id: string;
    action: string;
  }

  // User Assignments
  interface UserAssignmentBase {
    roleName: string;
    domain: string;
  }
  interface UserAssignmentForm extends UserAssignmentBase {
    userId: string;
  }
  interface UserAssignmentList extends UserAssignmentBase {
    userId: string;
    userName: string;
  }
}
