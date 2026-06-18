import { BookOpen, Building2, AlertTriangle, Users } from 'lucide-react'
import { ConflictResolver } from '@/components/dashboard/ConflictResolver'
import { SmartSuggestions } from '@/components/dashboard/SmartSuggestions'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { TimetablePreview } from '@/components/timetable/TimetablePreview'
import { kpiMetrics } from '@/data'

const icons = [BookOpen, Users, Building2, AlertTriangle]

export function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="NEP 2020 AI timetable overview - multidisciplinary education structures"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiMetrics.map((m, i) => (
          <KpiCard
            key={m.label}
            label={m.label}
            value={m.value}
            change={m.change}
            trend={m.trend}
            icon={icons[i]}
            warning={m.warning}
          />
        ))}
      </div>

      <div className="mt-6">
        <TimetablePreview />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ConflictResolver />
        </div>
        <SmartSuggestions />
      </div>
    </>
  )
}
