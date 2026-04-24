import {
  GraduationCap,
  Users,
  LayoutDashboard,
  BookOpen,
  Target,
  Briefcase,
  ShieldCheck,
  Accessibility,
  CreditCard,
  ClipboardList,
  Wrench,
  Award
} from "lucide-react";

const DashData = [
  {
    title: "Student Information System",
    icon: <GraduationCap size={24} />,
    colorClass: "blue",
  },
  {
    title: "Faculty Portal",
    icon: <Users size={24} />,
    colorClass: "purple",
  },
  {
    title: "Registrar / Admin Dashboard",
    icon: <LayoutDashboard size={24} />,
    colorClass: "grey",
  },
  {
    title: "Curriculog — Curriculum Governance",
    icon: <BookOpen size={24} />,
    colorClass: "green",
  },
  {
    title: "Competency Tracking",
    icon: <Target size={24} />,
    colorClass: "orange",
  },
  {
    title: "Career Gateway",
    icon: <Briefcase size={24} />,
    colorClass: "red",
  },
  {
    title: "ICON - Research Compliance",
    icon: <ShieldCheck size={24} />,
    colorClass: "orange",
  },
  {
    title: "Disability Center",
    icon: <Accessibility size={24} />,
    colorClass: "red",
  },
  {
    title: "Student ID & Campus Allowance",
    icon: <CreditCard size={24} />,
    colorClass: "blue",
  },
  {
    title: "University Queue - Virtual Queuing",
    icon: <ClipboardList size={24} />,
    colorClass: "purple",
  },
  {
    title: "FIXIT — Facility Management",
    icon: <Wrench size={24} />,
    colorClass: "grey",
  },
  {
    title: "Scholarship & Grants",
    icon: <Award size={24} />,
    colorClass: "green",
  },
];

export default DashData;