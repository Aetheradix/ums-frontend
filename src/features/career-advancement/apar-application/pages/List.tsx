import { useCallback, useState } from 'react';
import { Button } from 'shared/components/buttons';
import { DropDownList, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid, FormPage, GridPanel } from 'shared/new-components';
import AparStatusBadge from '../components/AparStatusBadge';
import { DUMMY_DEPARTMENTS, DUMMY_SESSIONS, DUMMY_STATUSES } from '../data';
import { useAparApplicationsQuery } from '../queries';
import './List.css';

type SearchFilter = CareerAdvancement.AparApplication.AparSearchFilter;
type AparItem = CareerAdvancement.AparApplication.AparApplicationItem;

const DEFAULT_FILTER: SearchFilter = {
  employeeSearch: '',
  departmentId: null,
  sessionId: null,
  statusId: null,
};

export default function List() {
  const [filter, setFilter] = useState<SearchFilter>(DEFAULT_FILTER);
  const [activeFilter, setActiveFilter] =
    useState<Partial<SearchFilter>>(DEFAULT_FILTER);

  const { data, isLoading } = useAparApplicationsQuery(activeFilter);

  const handleSearch = useCallback(() => {
    setActiveFilter({ ...filter });
  }, [filter]);

  const handleReset = useCallback(() => {
    setFilter(DEFAULT_FILTER);
    setActiveFilter(DEFAULT_FILTER);
  }, []);

  return (
    <FormPage
      title="APAR — All Applications"
      description="Initiate and manage APAR for all employees"
      breadcrumbs={[
        {
          label: 'Career Advancement',
          to: '/home/sub-menu/career-advancement',
        },
        {
          label: 'APAR — All Applications',
          to: '/career-advancement/apar-application/all',
        },
      ]}
    >
      <FormCard>
        <FormGrid columns={4}>
          <TextBox
            label="Search Employee"
            placeholder="Name / Employee ID"
            value={filter.employeeSearch}
            onChange={val =>
              setFilter(prev => ({ ...prev, employeeSearch: val }))
            }
          />
          <DropDownList
            label="Department"
            defaultOptionText="— Select —"
            data={DUMMY_DEPARTMENTS}
            textField="text"
            valueField="id"
            value={filter.departmentId}
            onChange={val =>
              setFilter(prev => ({
                ...prev,
                departmentId: val as string | null,
              }))
            }
          />
          <DropDownList
            label="Session"
            defaultOptionText="— Select —"
            data={DUMMY_SESSIONS}
            textField="text"
            valueField="id"
            value={filter.sessionId}
            onChange={val =>
              setFilter(prev => ({ ...prev, sessionId: val as string | null }))
            }
          />
          <DropDownList
            label="Status"
            defaultOptionText="— Select —"
            data={DUMMY_STATUSES}
            textField="text"
            valueField="id"
            value={filter.statusId}
            onChange={val =>
              setFilter(prev => ({ ...prev, statusId: val as string | null }))
            }
          />
        </FormGrid>

        <div className="form-actions-row">
          <Button
            label="Search"
            icon="search"
            variant="primary"
            onClick={handleSearch}
            isLoading={isLoading}
          />
          <Button label="Reset" variant="outlined" onClick={handleReset} />
        </div>
      </FormCard>

      <FormCard title="Employee List" icon="users">
        <GridPanel
          data={data}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'employeeId', header: 'Employee ID' },
            { field: 'employeeName', header: 'Employee Name' },
            { field: 'designation', header: 'Designation' },
            { field: 'department', header: 'Department' },
            { field: 'session', header: 'Session' },
            {
              field: 'status',
              header: 'Status',
              sortable: false,
              cell: (item: AparItem) => (
                <AparStatusBadge status={item.status} />
              ),
            },
            {
              header: 'Action',
              sortable: false,
              cell: () => (
                <div className="apar-action-buttons">
                  <Button label="Process" icon="play" variant="primary" />
                  <Button label="Track" icon="map-marker" variant="outlined" />
                </div>
              ),
            },
          ]}
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
