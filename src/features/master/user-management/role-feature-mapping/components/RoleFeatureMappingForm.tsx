import { Button } from 'shared/components/buttons';
import { DropDownList, TextBox } from 'shared/components/forms';
import { Loader } from 'shared/components/progress';
import { GridPanel } from 'shared/new-components';
import { useRoleFeatureMapping } from './form.hook';

export default function RoleFeatureMappingForm() {
  const {
    selectedRoleName,
    setSelectedRoleName,
    newFeature,
    setNewFeature,
    roleOptions,
    currentFeatures,
    handleAdd,
    handleRemove,
    isLoading,
  } = useRoleFeatureMapping();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid gap-6">
      <div className="max-w-md">
        <DropDownList
          label="Select Role"
          data={roleOptions}
          textField="label"
          valueField="value"
          value={selectedRoleName}
          onChange={val => setSelectedRoleName(val as string)}
          defaultOptionText="Choose a role..."
        />
      </div>

      {selectedRoleName && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Features & Permissions
          </h3>

          <div className="flex gap-4 items-end mb-6 p-6 rounded-xl shadow-sm border border-gray-100 bg-gray-50/50">
            <div className="flex-1">
              <TextBox
                label="Feature Name"
                value={newFeature.name}
                onChange={val => setNewFeature({ ...newFeature, name: val })}
                placeholder="e.g. @master/StudentManagement"
                allowAt
                validRegex={/[A-Za-z0-9@/]/}
              />
            </div>
            <div className="w-48">
              <DropDownList
                label="Action"
                data={[
                  { label: 'Read', value: 'read' },
                  { label: 'Write', value: 'write' },
                ]}
                textField="label"
                valueField="value"
                value={newFeature.action}
                onChange={val =>
                  setNewFeature({ ...newFeature, action: val as string })
                }
              />
            </div>
            <Button
              className="mb-4"
              label="Add Mapping"
              icon="plus"
              variant="primary"
              onClick={handleAdd}
              disabled={!newFeature.name}
            />
          </div>

          <GridPanel
            data={currentFeatures}
            columns={[
              {
                header: '#',
                cell: (_, option) => <span>{option.rowIndex + 1}</span>,
                width: '50px',
              },
              {
                field: 'featureName',
                header: 'Feature',
              },
              {
                field: 'action',
                header: 'Action',
                width: '150px',
              },
              {
                header: 'Actions',
                width: '100px',
                cell: (item: any) => (
                  <Button
                    icon="trash"
                    variant="text"
                    className="p-button-rounded p-button-danger"
                    onClick={() => handleRemove(item.featureName, item.action)}
                  />
                ),
              },
            ]}
            searchBox
          />
        </div>
      )}
    </div>
  );
}
