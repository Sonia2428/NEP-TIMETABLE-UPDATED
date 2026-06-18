import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Download,
  GraduationCap,
  LayoutDashboard,
  Sparkles,
  Users,
  Wand2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/generator', label: 'Timetable Generator', icon: Wand2 },
  { to: '/visualizations', label: 'Visualizations', icon: BarChart3 },
  { to: '/faculty', label: 'Faculty Management', icon: Users },
  { to: '/rooms', label: 'Room Management', icon: Building2 },
  { to: '/nep', label: 'NEP 2020 Compliance', icon: GraduationCap },
  { to: '/export', label: 'Reports & Export', icon: Download },
]

export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-active text-white">
          <Sparkles className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">NEP Timetable AI</p>
          <p className="text-xs text-sidebar-muted">Multidisciplinary · 2026</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
                isActive
                  ? 'bg-sidebar-active font-medium text-white shadow-md'
                  : 'text-sidebar-muted hover:bg-sidebar-border/50 hover:text-white',
              )
            }
          >
            <Icon className="size-4 shrink-0" />
            <span className="leading-tight">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-start gap-2 rounded-lg bg-sidebar-border/40 p-3">
          <ClipboardCheck className="mt-0.5 size-4 text-sidebar-muted" />
          <div>
            <p className="text-xs font-medium text-white">NEP 2020 Mode</p>
            <p className="text-xs text-sidebar-muted">
              Open electives · Multidisciplinary clusters active
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
