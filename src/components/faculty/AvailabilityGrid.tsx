import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DAYS, DEPARTMENTS, FACULTY, PERIODS, getFacultyAvailability, type AvailabilityStatus } from '@/data'
import { cn } from '@/lib/utils'

const statusStyle: Record<AvailabilityStatus, string> = {
  available: 'bg-white border-border hover:bg-muted/50',
  assigned: 'bg-violet-100 border-violet-300 text-violet-900',
  unavailable: 'bg-slate-200 border-slate-300 text-slate-600',
  leave: 'bg-red-100 border-red-300 text-red-800',
}

const statusLabel: Record<AvailabilityStatus, string> = {
  available: 'Available',
  assigned: 'Assigned',
  unavailable: 'Unavailable',
  leave: 'On Leave',
}

export function AvailabilityGrid() {
  const [dept, setDept] = useState<string>('all')
  const [detail, setDetail] = useState<string | null>(null)

  const filtered =
    dept === 'all' ? FACULTY : FACULTY.filter((f) => f.dept === dept)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Faculty Availability Grid</CardTitle>
          <CardDescription>Click cells to view or toggle status (mock)</CardDescription>
        </div>
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {detail && (
          <p className="mb-3 rounded-md bg-muted px-3 py-2 text-sm">{detail}</p>
        )}
        <table className="w-full min-w-[800px] border-collapse text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 border bg-muted p-2 text-left">
                Faculty
              </th>
              {DAYS.map((day) =>
                PERIODS.map((p) => (
                  <th
                    key={`${day}-${p}`}
                    className="border border-border p-1 font-normal text-muted-foreground"
                  >
                    {day[0]}
                    {p}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => {
              const grid = getFacultyAvailability(f.id)
              return (
                <tr key={f.id}>
                  <td className="sticky left-0 z-10 border border-border bg-card p-2 font-medium whitespace-nowrap">
                    {f.name.split(' ').slice(-1)[0]}
                  </td>
                  {grid.flatMap((row, di) =>
                    row.map((status, pi) => (
                      <td key={`${f.id}-${di}-${pi}`} className="p-0.5">
                        <button
                          type="button"
                          className={cn(
                            'size-7 w-full rounded border transition-colors',
                            statusStyle[status],
                          )}
                          onClick={() =>
                            setDetail(
                              `${f.name} · ${DAYS[di]} P${PERIODS[pi]}: ${statusLabel[status]}`,
                            )
                          }
                        />
                      </td>
                    )),
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          {(Object.keys(statusStyle) as AvailabilityStatus[]).map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className={cn('size-4 rounded border', statusStyle[s])} />
              {statusLabel[s]}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
