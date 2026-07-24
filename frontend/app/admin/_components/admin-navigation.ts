import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'

export const adminNavigation = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Students',
    href: '/admin/students',
    icon: Users,
  },
  {
    label: 'Teachers',
    href: '/admin/teachers',
    icon: GraduationCap,
  },
  {
    label: 'Courses',
    href: '/admin/courses',
    icon: BookOpen,
  },
  {
    label: 'Batches',
    href: '/admin/batches',
    icon: Layers,
  },
  {
    label: 'Placements',
    href: '/admin/placements',
    icon: Briefcase,
  },
  {
    label: 'Certificates',
    href: '/admin/certificates',
    icon: Award,
  },
  {
    label: 'Approvals',
    href: '/admin/approvals',
    icon: ShieldCheck,
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: Activity,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
] as const
