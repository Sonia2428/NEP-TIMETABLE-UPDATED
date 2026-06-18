import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { avgRoomUtilization, CHART_COLORS, roomWeeklyHours } from '@/data'

export function RoomUtilization() {
  const [sort, setSort] = useState<'util' | 'name'>('util')

  const data = useMemo(() => {
    const copy = [...roomWeeklyHours]
    if (sort === 'util') copy.sort((a, b) => b.utilization - a.utilization)
    else copy.sort((a, b) => a.room.localeCompare(b.room))
    return copy
  }, [sort])

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
        <div>
          <CardTitle>Room Utilization</CardTitle>
          <CardDescription>
            Average utilization:{' '}
            <span className="font-semibold text-primary">{avgRoomUtilization}%</span>{' '}
            across {roomWeeklyHours.length} rooms
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={sort === 'util' ? 'default' : 'outline'}
            onClick={() => setSort('util')}
          >
            High → Low
          </Button>
          <Button
            size="sm"
            variant={sort === 'name' ? 'default' : 'outline'}
            onClick={() => setSort('name')}
          >
            A → Z
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="room" width={100} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="occupied" stackId="a" fill={CHART_COLORS.blue} name="Occupied" />
            <Bar dataKey="free" stackId="a" fill={CHART_COLORS.gray} name="Free" />
            <Bar
              dataKey="maintenance"
              stackId="a"
              fill={CHART_COLORS.amber}
              name="Maintenance"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
