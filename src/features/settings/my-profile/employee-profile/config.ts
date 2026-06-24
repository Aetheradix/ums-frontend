// ── Employee Profile Configuration ──
// This config drives the entire my-profile page when the logged-in user is an employee.
// To add/remove/reorder fields: just edit this config. No component changes needed.

export const EMPLOYEE_PROFILE_CONFIG: Profile.Config = {
  tabs: [
    {
      title: 'Profile Details',
      editable: true,
      submitLabel: 'Update Profile',
      sections: [
        {
          icon: 'user',
          title: 'Basic Information',
          description: 'View your personal and identity-related information.',
          fields: [
            {
              field: 'fullName',
              label: 'Full Name',
              placeholder: 'Enter full name',
              type: 'text',
              disabled: true,
            },
            {
              field: 'nameInHindi',
              label: 'Name in Hindi',
              placeholder: 'Name in Hindi',
              type: 'text',
              disabled: true,
            },
            {
              field: 'gender',
              label: 'Gender',
              placeholder: 'Gender',
              type: 'text',
              disabled: true,
            },
            {
              field: 'dateOfBirth',
              label: 'Date of Birth',
              placeholder: 'Date of birth',
              type: 'text',
              disabled: true,
            },
            {
              field: 'category',
              label: 'Category',
              placeholder: 'Category',
              type: 'text',
              disabled: true,
            },
            {
              field: 'pwdStatus',
              label: 'PwD Status',
              placeholder: 'PwD status',
              type: 'text',
              disabled: true,
            },
            {
              field: 'bloodGroup',
              label: 'Blood Group',
              placeholder: 'Blood group',
              type: 'text',
              disabled: true,
            },
            {
              field: 'nationality',
              label: 'Nationality',
              placeholder: 'Nationality',
              type: 'text',
              disabled: true,
            },
            {
              field: 'maritalStatus',
              label: 'Marital Status',
              placeholder: 'Marital status',
              type: 'text',
              disabled: true,
            },
            {
              field: 'fatherName',
              label: 'Guardian / Father Name',
              placeholder: 'Guardian or father name',
              type: 'text',
              disabled: true,
            },
            {
              field: 'motherName',
              label: 'Mother Name',
              placeholder: 'Mother name',
              type: 'text',
              disabled: true,
            },
            {
              field: 'bio',
              label: 'Bio',
              placeholder: 'Write a short bio...',
              type: 'textarea',
              colSpan: 3,
            },
          ],
        },
      ],
    },
    {
      title: 'Contact & Address',
      editable: true,
      submitLabel: 'Update Contact Details',
      sections: [
        {
          icon: 'phone',
          title: 'Contact Information',
          description: 'Manage your alternate contact and emergency details.',
          fields: [
            {
              field: 'officialEmail',
              label: 'Official Email ID',
              placeholder: 'Official email ID',
              type: 'text',
              disabled: true,
            },
            {
              field: 'alternateEmail',
              label: 'Alternate Email ID',
              placeholder: 'Enter alternate email ID',
              type: 'text',
            },
            {
              field: 'officialPhone',
              label: 'Official Phone No.',
              placeholder: 'Official phone number',
              type: 'text',
              disabled: true,
            },
            {
              field: 'alternatePhone',
              label: 'Alternate Phone No.',
              placeholder: 'Enter alternate phone number',
              type: 'text',
            },
            {
              field: 'emergencyPhone',
              label: 'Emergency Phone No.',
              placeholder: 'Enter emergency phone number',
              type: 'text',
            },
          ],
        },
        {
          icon: 'map-marker',
          title: 'Address Information',
          description:
            'Review your permanent address and update your local address.',
          columns: 2,
          fields: [
            {
              field: 'permanentAddress',
              label: 'Permanent Address',
              placeholder: 'Permanent address',
              type: 'textarea',
              disabled: true,
            },
            {
              field: 'localAddress',
              label: 'Local Address',
              placeholder: 'Enter local address',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      title: 'Organization Details',
      editable: false,
      sections: [
        {
          icon: 'building',
          title: 'Organization Information',
          description: 'Your organizational placement and reporting structure.',
          fields: [
            {
              field: 'employeeCode',
              label: 'Employee Code',
              type: 'text',
              disabled: true,
            },
            {
              field: 'role',
              label: 'Role',
              type: 'text',
              disabled: true,
            },
            {
              field: 'department',
              label: 'Department',
              type: 'text',
              disabled: true,
            },
            {
              field: 'designation',
              label: 'Designation',
              type: 'text',
              disabled: true,
            },
            {
              field: 'organizationUnit',
              label: 'Organization Unit',
              type: 'text',
              disabled: true,
            },
            {
              field: 'reportingTo',
              label: 'Reporting To',
              type: 'text',
              disabled: true,
            },
            {
              field: 'employeeType',
              label: 'Employee Type',
              type: 'text',
              disabled: true,
            },
            {
              field: 'natureOfEmployment',
              label: 'Nature of Employment',
              type: 'text',
              disabled: true,
            },
            {
              field: 'dateOfJoining',
              label: 'Date of Joining',
              type: 'text',
              disabled: true,
            },
            {
              field: 'employeeStatus',
              label: 'Employee Status',
              type: 'text',
              disabled: true,
            },
            {
              field: 'workLocation',
              label: 'Work Location',
              type: 'text',
              disabled: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Professional Details',
      editable: false,
      sections: [
        {
          icon: 'graduation-cap',
          title: 'Qualifications & Experience',
          description: 'Your academic qualifications and professional details.',
          fields: [
            {
              field: 'ugQualification',
              label: 'UG Qualification',
              type: 'text',
              disabled: true,
            },
            {
              field: 'pgQualification',
              label: 'PG Qualification',
              type: 'text',
              disabled: true,
            },
            {
              field: 'registrationNumber',
              label: 'Registration Number',
              type: 'text',
              disabled: true,
            },
            {
              field: 'totalExperience',
              label: 'Total Experience',
              type: 'text',
              disabled: true,
            },
            {
              field: 'specialization',
              label: 'Specialization',
              type: 'text',
              disabled: true,
            },
          ],
        },
      ],
    },
  ],
};

export const EMPLOYEE_SIDEBAR_CONFIG: Profile.SidebarConfig = {
  rows: [
    { label: 'Employee Code', field: 'employeeCode' },
    { label: 'Full Name', field: 'fullName' },
    { label: 'Email', field: 'officialEmail' },
    { label: 'Official Phone', field: 'officialPhone' },
    { label: 'Department', field: 'department' },
    { label: 'Designation', field: 'designation' },
    { label: 'Bio', field: 'bio' },
  ],
};
