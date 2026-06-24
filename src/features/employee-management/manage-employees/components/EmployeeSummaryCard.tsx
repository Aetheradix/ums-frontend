import { useMemo } from 'react';
import { useGetEmployeeByIdQuery } from '../queries';

type EmployeeData = NonNullable<
  ReturnType<typeof useGetEmployeeByIdQuery>['data']
>;

interface EmployeeSummaryCardProps {
  data: EmployeeData;
}

export default function EmployeeSummaryCard({
  data,
}: EmployeeSummaryCardProps) {
  const employeeName = useMemo(
    () =>
      [data.salutation, data.firstName, data.middleName, data.lastName]
        .filter(Boolean)
        .join(' '),
    [data]
  );

  const initials = useMemo(() => {
    const first = data.firstName?.charAt(0) ?? '';
    const last = data.lastName?.charAt(0) ?? '';
    return `${first}${last}`.toUpperCase() || 'EM';
  }, [data]);

  const statusClass = data.isActive ? 'active' : 'inactive';

  return (
    <section className="profile-summary-card">
      {/* Left — avatar + identity */}
      <div className="profile-summary-main">
        <div className="profile-summary-avatar">
          <span>{initials}</span>
          <span className={`profile-summary-avatar-status ${statusClass}`} />
        </div>

        <div className="profile-summary-identity">
          <h3>{employeeName}</h3>

          <span className="profile-summary-code">{data.employeeCode}</span>

          <div className="profile-summary-chips">
            {data.gender && (
              <span className="profile-summary-chip">
                <i className="pi pi-user" />
                {data.gender}
              </span>
            )}

            {data.employeeType && (
              <span className="profile-summary-chip">
                <i className="pi pi-briefcase" />
                {data.employeeType}
              </span>
            )}

            {data.employeeNature && (
              <span className="profile-summary-chip">
                <i className="pi pi-shield" />
                {data.employeeNature}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right — contact + status */}
      <div className="profile-summary-meta">
        <div className="profile-summary-meta-box">
          <div>
            <span className="profile-summary-meta-label">Phone No</span>
            <strong className="profile-summary-meta-value">
              <i className="pi pi-phone" />
              {data.mobileNumber || 'N/A'}
            </strong>
          </div>

          <div>
            <span className="profile-summary-meta-label">Email ID</span>
            <strong className="profile-summary-meta-value">
              <i className="pi pi-envelope" />
              {data.officialEmail || 'N/A'}
            </strong>
          </div>
        </div>

        <div className="profile-summary-meta-box">
          <div>
            <span className="profile-summary-meta-label">Employee Status</span>
            <span className={`profile-summary-status ${statusClass}`}>
              <span />
              {data.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div>
            <span className="profile-summary-meta-label">Date of Joining</span>
            <strong>N/A</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
