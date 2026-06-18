import { PageHeader } from '@/components/shared/PageHeader'
import { TimetablePreview } from '@/components/timetable/TimetablePreview'
import { FacultyDonuts } from '@/components/visualizations/FacultyDonuts'
import { RoomUtilization } from '@/components/visualizations/RoomUtilization'
import { WeeklyHeatmap } from '@/components/visualizations/WeeklyHeatmap'

export function VisualizationsPage() {
  return (
    <>
      <PageHeader
        title="Visualizations"
        description="Heatmaps, faculty workload, and room utilization analytics"
      />
      <div className="space-y-8">
        <WeeklyHeatmap />
        <TimetablePreview />
        <FacultyDonuts />
        <RoomUtilization />
      </div>
    </>
  )
}
