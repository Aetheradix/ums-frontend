import { useAuth } from 'auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Control, Path } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { ProfileFormTab, ProfileSidebarCard } from 'shared/components/profile';
import { FormPage, Tabs } from 'shared/new-components';
import {
  EMPLOYEE_PROFILE_CONFIG,
  EMPLOYEE_SIDEBAR_CONFIG,
} from './employee-profile/config';
import './MyProfile.css';

// ── Form state type — collects all possible fields across all roles ──
type ProfileFormState = Record<string, unknown> & {
  fullName: string;
  officialEmail: string;
  profileImage: File | string | null;
};

// ── Default values for the employee role ──
function getEmployeeDefaults(
  username: string,
  email: string
): ProfileFormState {
  return {
    fullName: username,
    officialEmail: email,
    profileImage: null,

    // Organization
    employeeCode: 'E8123',
    role: 'Admin',
    department: 'HR',
    designation: 'HR Manager',
    organizationUnit: 'SFA Technologies Pvt. Ltd.',
    reportingTo: 'xyz',
    employeeType: 'Permanent',
    natureOfEmployment: 'Regular',
    dateOfJoining: '02-10-2021',
    employeeStatus: 'Active',
    workLocation: 'Bhopal',

    // Professional
    ugQualification: '',
    pgQualification: '',
    councilOrBoard: '',
    registrationNumber: '',
    totalExperience: '',
    specialization: '',

    // Personal
    nameInHindi: '',
    gender: '',
    category: '',
    pwdStatus: 'No',
    bloodGroup: '',
    nationality: 'Indian',
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    spouseName: '',
    weddingDate: '',
    dateOfBirth: '',

    // Contact
    alternateEmail: '',
    officialPhone: '9876543210',
    alternatePhone: '',
    emergencyPhone: '',

    // Address
    permanentAddress: '',
    localAddress: '',
    bio: '',
  };
}

// ── Resolve config based on role ──
function getProfileConfig(_role: string): {
  config: Profile.Config;
  sidebar: Profile.SidebarConfig;
} {
  // Future: switch on role to return STUDENT_PROFILE_CONFIG, etc.
  return {
    config: EMPLOYEE_PROFILE_CONFIG,
    sidebar: EMPLOYEE_SIDEBAR_CONFIG,
  };
}

export default function MyProfile() {
  const { user } = useAuth();

  const username = user?.profile?.name || user?.profile?.sub || 'User';
  const email = user?.profile?.email || 'admin@gmail.com';
  const role = 'employee'; // Future: derive from user.role or auth context

  const { config, sidebar } = useMemo(() => getProfileConfig(role), [role]);

  const [activeTab, setActiveTab] = useState<number>(0);

  const getDefaults = useCallback(
    () => getEmployeeDefaults(username, email),
    [username, email]
  );

  const { control, handleSubmit, reset, watch } = useForm<ProfileFormState>({
    defaultValues: getDefaults(),
  });

  const register = (
    name: Path<ProfileFormState>
  ): {
    control: Control<ProfileFormState>;
    name: Path<ProfileFormState>;
  } => ({
    control,
    name,
  });

  const profileForm = watch();

  useEffect(() => {
    reset(getDefaults());
  }, [getDefaults, reset]);

  const handleSave = (data: ProfileFormState) => {
    // API integration
    void data;
  };

  const handleReset = () => {
    reset(getDefaults());
  };

  return (
    <FormPage
      title="My Profile"
      description="Manage your profile information and account preferences."
    >
      <div className="my-profile-layout">
        <ProfileSidebarCard<ProfileFormState>
          config={sidebar}
          formValues={profileForm}
          username={username}
          register={register}
        />

        <section className="my-profile-content-card">
          <Tabs
            className="my-profile-tabs-wrap"
            panelClassName="my-profile-tab-panel"
            activeIndex={activeTab}
            onTabChange={event => setActiveTab(event.index)}
            tabs={config.tabs.map(tabConfig => ({
              title: tabConfig.title,
              content: (
                <ProfileFormTab<ProfileFormState>
                  config={tabConfig}
                  register={register}
                  onSubmit={handleSubmit(handleSave)}
                  onReset={handleReset}
                />
              ),
            }))}
          />
        </section>
      </div>
    </FormPage>
  );
}
