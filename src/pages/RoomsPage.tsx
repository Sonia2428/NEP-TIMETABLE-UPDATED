import { RoomUtilization } from '@/components/visualizations/RoomUtilization'
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROOMS } from '@/data'

export function RoomsPage() {
  return (
    <>
      <PageHeader
        title="Room Management"
        description={`${ROOMS.length} rooms · utilization 40–95%`}
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ROOMS.map((room) => (
          <Card key={room.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{room.name}</CardTitle>
                <Badge variant="secondary">{room.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{room.utilization}%</p>
              <p className="text-xs text-muted-foreground">weekly utilization</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <RoomUtilization />
    </>
  )
}
