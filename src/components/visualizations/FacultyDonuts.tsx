import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CHART_COLORS, facultyDonutDisplay } from '@/data'
import { cn } from '@/lib/utils'

const sliceColors = [CHART_COLORS.primary, CHART_COLORS.gray, CHART_COLORS.teal]

export function FacultyDonuts() {
  const [selected, setSelected] = useState<string | null>(null)
  const faculty = facultyDonutDisplay.find((f) => f.id === selected)

  const breakdown = faculty
    ? [
        { name: 'Mon', hours: 4 },
        { name: 'Tue', hours: 5 },
        { name: 'Wed', hours: 3 },
        { name: 'Thu', hours: 4 },
        { name: 'Fri', hours: faculty.teaching - 16 },
        { name: 'Sat', hours: 2 },
      ].map((d) => ({ ...d, hours: Math.max(d.hours, 0) }))
    : []

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facultyDonutDisplay.map((f) => {
          const total = f.teaching + f.free + f.admin
          const data = [
            { name: 'Teaching', value: f.teaching },
            { name: 'Free', value: f.free },
            { name: 'Admin', value: f.admin },
          ]
          return (
            <motion.button
              key={f.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(selected === f.id ? null : f.id)}
              className={cn(
                'rounded-xl border bg-card p-4 text-left transition-shadow',
                selected === f.id
                  ? 'border-primary shadow-md ring-2 ring-primary/20'
                  : 'border-border',
              )}
            >
              <p className="truncate text-sm font-medium">{f.name}</p>
              <p className="text-xs text-muted-foreground">{f.dept}</p>
              <div className="relative mx-auto mt-2 h-36 w-full max-w-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      innerRadius={42}
                      outerRadius={58}
                      paddingAngle={2}
                    >
                      {data.map((_, i) => (
                        <Cell key={i} fill={sliceColors[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {total}h
                  </p>
                </ResponsiveContainer>
              </div>
            </motion.button>
          )
        })}
      </div>

      {faculty && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>{faculty.name} — Weekly Breakdown</CardTitle>
              <CardDescription>Teaching hours by day</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdown}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="hours" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
