declare namespace CareerAdvancement {
  namespace AparApplication {
    // Search filter form
    interface AparSearchFilter {
      employeeSearch: string;
      departmentId: string | null;
      sessionId: string | null;
      statusId: string | null;
    }

    // Item returned from the list API
    interface AparApplicationItem {
      id: number;
      employeeId: string;
      employeeName: string;
      designation: string;
      department: string;
      session: string;
      status: 'Pending' | 'Forwarded' | 'Completed';
    }
  }
}
