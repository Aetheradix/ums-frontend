import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage } from 'shared/new-components';
import { useGetEmployeeByIdQuery, useGetMyProfileQuery } from '../queries';

export default function ProfileView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isMyProfile = !id || id === 'my-profile';

  const { data: employeeData, isLoading: isEmployeeLoading } =
    useGetEmployeeByIdQuery(!isMyProfile ? Number(id) : 0);
  const { data: myData, isLoading: isMyProfileLoading } =
    useGetMyProfileQuery(isMyProfile);

  const data = isMyProfile ? myData : employeeData;
  const isLoading = isMyProfile ? isMyProfileLoading : isEmployeeLoading;

  return (
    <FormPage
      title="Employee Profile"
      description="View detailed information about the employee."
    >
      <FormCard title="Profile Details" icon="user">
        {isLoading && <Loader />}

        {!isLoading && data ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-lg">
                {data.salutation} {data.firstName} {data.middleName ?? ''}{' '}
                {data.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Employee Code</p>
              <p className="font-medium">{data.employeeCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Employee Type</p>
              <p className="font-medium">{data.employeeType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nature of Employment</p>
              <p className="font-medium">{data.employeeNature}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Organization Unit</p>
              <p className="font-medium">{data.organizationUnit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Post</p>
              <p className="font-medium">{data.post}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Seniority Rank</p>
              <p className="font-medium">{data.seniorityRank}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subject Specialization</p>
              <p className="font-medium">{data.subjectSpecialization}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{data.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">
                {data.dateOfBirth
                  ? new Date(data.dateOfBirth).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Official Email</p>
              <p className="font-medium">{data.officialEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mobile Number</p>
              <p className="font-medium">{data.mobileNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Appointed Category</p>
              <p className="font-medium">{data.appointedCategory ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">
                <span
                  className={`px-2 py-1 rounded text-xs text-white ${data.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {data.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>
        ) : (
          !isLoading && <p>Employee not found.</p>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            label="Back to List"
            icon="arrow-left"
            variant="outlined"
            onClick={() => navigate('/employee-management/manage-employees')}
          />
        </div>
      </FormCard>
    </FormPage>
  );
}
