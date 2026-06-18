import { useMemo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DAYS, PERIODS, generateHeatmap } from '@/data'
import { cn } from '@/lib/utils'

function loadColor(load: number) {
  if (load < 0.2) return 'bg-emerald-100 text-emerald-800'
  if (load < 0.4) return 'bg-emerald-300 text-emerald-900'
  if (load < 0.6) return 'bg-emerald-500 text-white'
  if (load < 0.8) return 'bg-amber-400 text-amber-950'
  return 'bg-red-500 text-white'
}

export function WeeklyHeatmap() {
  const [filter, setFilter] = useState<'department' | 'faculty' | 'room'>('department')
  const [hover, setHover] = useState<{
    day: string
    period: number
    courses: number
    rooms: number
  } | null>(null)

  const cells = useMemo(() => generateHeatmap(filter), [filter])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Weekly Load Heatmap</CardTitle>
          <CardDescription>Mon–Sat × 8 periods · intensity by load</CardDescription>
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="department">By Department</SelectItem>
            <SelectItem value="faculty">By Faculty</SelectItem>
            <SelectItem value="room">By Room</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {hover && (
          <div className="mb-3 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm">
            <strong>{hover.day}</strong> Period {hover.period}: {hover.courses} courses,{' '}
            {hover.rooms} rooms in use
          </div>
        )}
        <div className="overflow-x-auto">
          <div
            className="inline-grid gap-1"
            style={{
              gridTemplateColumns: `48px repeat(${DAYS.length}, minmax(56px, 1fr))`,
            }}
          >
            <div />
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground">
                {d}
              </div>
            ))}
            {PERIODS.map((period) => (
              <div key={period} className="contents">
                <div className="flex items-center justify-end pr-2 text-xs text-muted-foreground">
                  P{period}
                </div>
                {DAYS.map((day, di) => {
                  const cell = cells[di * PERIODS.length + period - 1]
                  return (
                    <button
                      key={`${day}-${period}`}
                      type="button"
                      className={cn(
                        'aspect-square min-h-10 rounded-md text-[10px] font-medium transition-transform hover:scale-105',
                        loadColor(cell.load),
                      )}
                      onMouseEnter={() =>
                        setHover({
                          day,
                          period,
                          courses: cell.courses,
                          rooms: cell.rooms,
                        })
                      }
                      onMouseLeave={() => setHover(null)}
                    >
                      {Math.round(cell.load * 100)}%
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="size-3 rounded bg-emerald-100" /> Free
          </span>
          <span className="flex items-center gap-1">
            <span className="size-3 rounded bg-emerald-500" /> Light
          </span>
          <span className="flex items-center gap-1">
            <span className="size-3 rounded bg-amber-400" /> Moderate
          </span>
          <span className="flex items-center gap-1">
            <span className="size-3 rounded bg-red-500" /> Heavy
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
