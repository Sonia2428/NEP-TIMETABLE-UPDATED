import { AvailabilityGrid } from '@/components/faculty/AvailabilityGrid'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FACULTY } from '@/data'

export function FacultyPage() {
  return (
    <>
      <PageHeader
        title="Faculty Management"
        description={`${FACULTY.length} faculty across 6 departments · 5 days × 8 periods`}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total faculty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{FACULTY.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. teaching load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">13.2h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              On leave today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">2</p>
          </CardContent>
        </Card>
      </div>
      <AvailabilityGrid />
    </>
  )
}
