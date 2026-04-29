// import {
//   GraduationCap,
//   Users,
//   LayoutDashboard,
//   BookOpen,
//   Target,
//   Briefcase,
//   ShieldCheck,
//   Accessibility,
//   CreditCard,
//   ClipboardList,
//   Wrench,
//   Award
// } from "lucide-react";

// const DashData = [
//   {
//     title: "Student Information System",
//     icon: <GraduationCap size={24} />,
//     colorClass: "blue",
//   },
//   {
//     title: "Faculty Portal",
//     icon: <Users size={24} />,
//     colorClass: "purple",
//   },
//   {
//     title: "Registrar / Admin Dashboard",
//     icon: <LayoutDashboard size={24} />,
//     colorClass: "grey",
//   },
//   {
//     title: "Curriculog — Curriculum Governance",
//     icon: <BookOpen size={24} />,
//     colorClass: "green",
//   },
//   {
//     title: "Competency Tracking",
//     icon: <Target size={24} />,
//     colorClass: "orange",
//   },
//   {
//     title: "Career Gateway",
//     icon: <Briefcase size={24} />,
//     colorClass: "red",
//   },
//   {
//     title: "ICON - Research Compliance",
//     icon: <ShieldCheck size={24} />,
//     colorClass: "orange",
//   },
//   {
//     title: "Disability Center",
//     icon: <Accessibility size={24} />,
//     colorClass: "red",
//   },
//   {
//     title: "Student ID & Campus Allowance",
//     icon: <CreditCard size={24} />,
//     colorClass: "blue",
//   },
//   {
//     title: "University Queue - Virtual Queuing",
//     icon: <ClipboardList size={24} />,
//     colorClass: "purple",
//   },
//   {
//     title: "FIXIT — Facility Management",
//     icon: <Wrench size={24} />,
//     colorClass: "grey",
//   },
//   {
//     title: "Scholarship & Grants",
//     icon: <Award size={24} />,
//     colorClass: "green",
//   },
// ];

// export default DashData;

import {
  GraduationCap, Users, LayoutDashboard, BookOpen,
  Zap, Briefcase, FlaskConical, Accessibility,
  CreditCard, Monitor, Wrench, Award,
} from 'lucide-react';
import { type ReactNode } from 'react';

export type ColorClass =
  | 'blue' | 'purple' | 'green' | 'orange'
  | 'red' | 'pink' | 'teal' | 'grey' | 'indigo';

export type ModuleGroup = 'Academics' | 'HR' | 'Finance' | 'Operation';

export interface DashTile {
  id: string;
  title: string;
  icon: ReactNode;
  colorClass: ColorClass;
  module: ModuleGroup;
}

export const DashData: DashTile[] = [
  { id: 'student-info', title: 'Student Information System', icon: <GraduationCap size={18} />, colorClass: 'blue', module: 'Academics' },
  { id: 'faculty-portal', title: 'Faculty Portal', icon: <Users size={18} />, colorClass: 'purple', module: 'HR' },
  { id: 'registrar', title: 'Registrar / Admin Dashboard', icon: <LayoutDashboard size={18} />, colorClass: 'grey', module: 'Finance' },
  { id: 'curriculog', title: 'Curriculog — Curriculum Governance', icon: <BookOpen size={18} />, colorClass: 'green', module: 'Academics' },
  { id: 'competency', title: 'Competency Tracking', icon: <Zap size={18} />, colorClass: 'orange', module: 'HR' },
  { id: 'career', title: 'Career Gateway', icon: <Briefcase size={18} />, colorClass: 'red', module: 'HR' },
  { id: 'icon-research', title: 'ICON — Research Compliance', icon: <FlaskConical size={18} />, colorClass: 'orange', module: 'Finance' },
  { id: 'disability', title: 'Disability Center', icon: <Accessibility size={18} />, colorClass: 'pink', module: 'HR' },
  { id: 'student-id', title: 'Student ID & Campus Allowance', icon: <CreditCard size={18} />, colorClass: 'blue', module: 'Academics' },
  { id: 'univ-queue', title: 'University Queue — Virtual Queuing', icon: <Monitor size={18} />, colorClass: 'purple', module: 'Operation' },
  { id: 'fixit', title: 'FIXIT — Facility Management', icon: <Wrench size={18} />, colorClass: 'teal', module: 'Operation' },
  { id: 'scholarship', title: 'Scholarship & Grants', icon: <Award size={18} />, colorClass: 'indigo', module: 'Finance' },
];

export type BadgeVariant = 'green' | 'blue' | 'amber' | 'red';

export interface Submodule {
  icon: string;
  colorClass: ColorClass;
  title: string;
  desc: string;
  badge: string;
  badgeVariant: BadgeVariant;
}

export const SubmoduleData: Record<ModuleGroup, Submodule[]> = {
  HR: [
    { icon: '👤', colorClass: 'blue', title: 'Employee Records', desc: 'Manage employee profiles, contracts, and personal data.', badge: '12 Active Workflows', badgeVariant: 'green' },
    { icon: '💰', colorClass: 'green', title: 'Payroll Processing', desc: 'Automate salary runs, deductions, and tax filings.', badge: 'Q4 Reports Ready', badgeVariant: 'blue' },
    { icon: '🎯', colorClass: 'purple', title: 'Talent Acquisition', desc: 'Job postings, applicant tracking, and onboarding flows.', badge: '8 Open Roles', badgeVariant: 'amber' },
    { icon: '📊', colorClass: 'orange', title: 'Performance Reviews', desc: '360° feedback cycles and KPI tracking dashboards.', badge: '3 Pending Reviews', badgeVariant: 'red' },
  ],
  Finance: [
    { icon: '📒', colorClass: 'green', title: 'General Ledger', desc: 'Track global transactions and ledger balances.', badge: 'Q4 Reports Ready', badgeVariant: 'blue' },
    { icon: '🧾', colorClass: 'blue', title: 'Accounts Payable', desc: 'Vendor invoices, approvals, and payment scheduling.', badge: '14 Pending', badgeVariant: 'amber' },
    { icon: '📈', colorClass: 'teal', title: 'Budget Planning', desc: 'Department budgets, forecasts, and variance analysis.', badge: 'FY2025 Active', badgeVariant: 'green' },
    { icon: '⚖️', colorClass: 'purple', title: 'Tax Compliance', desc: 'Automated tax reporting and regulatory submissions.', badge: '2 Filings Due', badgeVariant: 'red' },
  ],
  Operation: [
    { icon: '📋', colorClass: 'blue', title: 'Work Orders', desc: 'Create and track operational work orders end-to-end.', badge: 'Active', badgeVariant: 'green' },
    { icon: '🏭', colorClass: 'orange', title: 'Inventory Control', desc: 'Real-time stock monitoring and warehouse logistics.', badge: '3 Low Stock Alerts', badgeVariant: 'red' },
    { icon: '🚚', colorClass: 'teal', title: 'Logistics', desc: 'Shipment tracking, delivery endpoints, and routing.', badge: 'Performance Up 14%', badgeVariant: 'blue' },
    { icon: '✅', colorClass: 'green', title: 'Quality Control', desc: 'Inspection checklists, tolerance margins, and QC reports.', badge: '8 Pending Approvals', badgeVariant: 'amber' },
  ],
  Academics: [
    { icon: '📅', colorClass: 'blue', title: 'Course Scheduling', desc: 'Timetables, room assignments, and credit management.', badge: 'Spring 2025 Live', badgeVariant: 'green' },
    { icon: '📊', colorClass: 'purple', title: 'Student Analytics', desc: 'Enrollment trends, GPA tracking, and retention data.', badge: 'Report Ready', badgeVariant: 'blue' },
    { icon: '🏛️', colorClass: 'teal', title: 'Accreditation', desc: 'Manage program accreditation cycles and documentation.', badge: '2 Renewals Due', badgeVariant: 'amber' },
    { icon: '📚', colorClass: 'green', title: 'Library System', desc: 'Digital catalog, borrowing, and resource management.', badge: 'Online', badgeVariant: 'green' },
  ],
};

export function getTileById(id: string | null): DashTile | undefined {
  return DashData.find(t => t.id === id);
}

export function getModuleGroup(tileId: string | null): ModuleGroup {
  return getTileById(tileId)?.module ?? 'HR';
}
