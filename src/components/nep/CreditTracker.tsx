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
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CHART_COLORS, students, type StudentCredit } from '@/data'

const statusVariant: Record<
  StudentCredit['status'],
  'success' | 'warning' | 'destructive'
> = {
  Met: 'success',
  Pending: 'warning',
  Overloaded: 'destructive',
}

export function CreditTracker() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.program.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'all' || s.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  const chartSample = students.slice(0, 12)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Credit Distribution (All Students)</CardTitle>
          <CardDescription>Stacked credits by NEP category — sample cohort</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartSample}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="id" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="major" stackId="a" fill={CHART_COLORS.primary} name="Major" />
              <Bar dataKey="minor" stackId="a" fill={CHART_COLORS.teal} name="Minor" />
              <Bar
                dataKey="openElective"
                stackId="a"
                fill={CHART_COLORS.amber}
                name="Open Elective"
              />
              <Bar
                dataKey="vocational"
                stackId="a"
                fill={CHART_COLORS.indigo}
                name="Vocational"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Credit Score Tracker</CardTitle>
            <CardDescription>40 students · NEP 2020 credit compliance</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="Search ID or program…"
              className="w-48"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="Met">Met</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overloaded">Overloaded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Minor</TableHead>
                <TableHead>Open Elec.</TableHead>
                <TableHead>Vocational</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>NEP Target</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs">{s.id}</TableCell>
                  <TableCell>{s.program}</TableCell>
                  <TableCell>{s.major}</TableCell>
                  <TableCell>{s.minor}</TableCell>
                  <TableCell>{s.openElective}</TableCell>
                  <TableCell>{s.vocational}</TableCell>
                  <TableCell className="font-medium">{s.total}</TableCell>
                  <TableCell>{s.nepTarget}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[s.status]}>{s.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
