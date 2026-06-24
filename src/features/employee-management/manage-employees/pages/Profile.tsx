import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'shared/components/buttons';
import { ProfilePage } from 'shared/components/profile';
import { Loader } from 'shared/components/progress';
import EmployeeSummaryCard from '../components/EmployeeSummaryCard';
import { useGetEmployeeByIdQuery } from '../queries';

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetEmployeeByIdQuery(Number(id));

  const [showMoreActions, setShowMoreActions] = useState(false);
  const moreActionRef = useRef<HTMLDivElement | null>(null);

  if (isLoading) return <Loader />;
  if (!data) return <p>Employee not found.</p>;

  return (
    <ProfilePage
      title="Employee Profile"
      description="View detailed information about the employee."
      summaryCard={<EmployeeSummaryCard data={data} />}
      actions={
        <>
          <Button
            label="Edit Employee"
            icon="pencil"
            variant="outlined"
            size="small"
            onClick={() =>
              navigate(
                `/employee-management/manage-employees/${data.employeeId}/edit`
              )
            }
          />

          <div className="profile-icon-action-panel">
            <Button
              icon="arrow-left"
              variant="text"
              size="small"
              className="profile-panel-icon-btn"
              onClick={() => navigate('/employee-management/manage-employees')}
            />

            <span className="profile-action-divider" />

            <div className="profile-more-action-wrap" ref={moreActionRef}>
              <Button
                icon="ellipsis-v"
                variant="text"
                size="small"
                className="profile-panel-icon-btn"
                onClick={() => setShowMoreActions(prev => !prev)}
              />

              {showMoreActions && (
                <div className="profile-more-menu">
                  <Button
                    label="Change Status"
                    icon="refresh"
                    variant="text"
                    size="small"
                    className="profile-more-menu-button"
                    onClick={() => {}}
                  />

                  <Button
                    label="Download Profile"
                    icon="download"
                    variant="text"
                    size="small"
                    className="profile-more-menu-button"
                    onClick={() => {}}
                  />

                  <Button
                    label="Deactivate Employee"
                    icon="ban"
                    variant="text"
                    size="small"
                    className="profile-more-menu-button profile-more-menu-button-danger"
                    onClick={() => {}}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      }
      tabs={[
        { title: 'Overview', content: null },
        { title: 'Employment', content: null },
        { title: 'Organization', content: null },
        { title: 'Contact', content: null },
        { title: 'Documents', content: null },
        { title: 'History', content: null },
      ]}
    />
  );
}
