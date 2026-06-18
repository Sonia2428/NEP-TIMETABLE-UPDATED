import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTimetable } from '@/context/TimetableContext'
import { CHART_COLORS, DAYS, PERIODS } from '@/data'

export function TimetablePreview() {
  const { timetable, downloadTimetable } = useTimetable()

  const dayLoad = DAYS.map((day) => ({
    day,
    classes: timetable.filter((entry) => entry.day === day).length,
  }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Live Timetable</CardTitle>
          <CardDescription>Updates immediately when conflicts are resolved</CardDescription>
        </div>
        <Button variant="outline" onClick={() => downloadTimetable('csv')}>
          <Download />
          Download
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dayLoad}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="classes" fill={CHART_COLORS.primary} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              {DAYS.map((day) => (
                <TableHead key={day}>{day}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {PERIODS.map((period) => (
              <TableRow key={period}>
                <TableCell className="font-medium">P{period}</TableCell>
                {DAYS.map((day) => {
                  const entries = timetable.filter((entry) => entry.day === day && entry.period === period)
                  return (
                    <TableCell key={`${day}-${period}`} className="min-w-36 align-top">
                      {entries.length === 0 ? (
                        <span className="text-xs text-muted-foreground">Free</span>
                      ) : (
                        <div className="space-y-2">
                          {entries.map((entry) => (
                            <div key={entry.id} className="rounded-md border bg-muted/40 p-2">
                              <p className="text-xs font-semibold text-foreground">{entry.course}</p>
                              <p className="text-[11px] text-muted-foreground">{entry.room}</p>
                              <p className="text-[11px] text-muted-foreground">{entry.faculty}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
