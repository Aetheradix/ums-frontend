import { DropDownList, CheckboxList } from 'shared/components/forms';
import { Loader } from 'shared/components/progress';
import { useUserRoleMapping } from './form.hook';

export default function UserRoleMappingForm() {
  const {
    selectedUserId,
    setSelectedUserId,
    userOptions,
    roleOptions,
    currentRolesObj,
    handleRoleToggle,
    isLoading,
  } = useUserRoleMapping();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid gap-6">
      <div className="max-w-md">
        <DropDownList
          label="Select User"
          data={userOptions}
          textField="label"
          valueField="value"
          value={selectedUserId}
          onChange={val => setSelectedUserId(val as string)}
          defaultOptionText="Choose a user..."
        />
      </div>

      {selectedUserId && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Assign Roles
          </h3>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <CheckboxList
              options={roleOptions}
              selectedValues={currentRolesObj}
              getLabel={(o: { label: string; value: string }) => o.label}
              getValue={(o: { label: string; value: string }) => o.value}
              onChange={(values: Record<string | number, boolean>) => {
                for (const [roleName, isChecked] of Object.entries(values)) {
                  if (!!currentRolesObj[roleName] !== !!isChecked) {
                    handleRoleToggle(roleName, !!isChecked);
                    break;
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
