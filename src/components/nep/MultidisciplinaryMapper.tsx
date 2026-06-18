import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DEPARTMENTS, multidisciplinaryMatrix } from '@/data'
import { cn } from '@/lib/utils'

export function MultidisciplinaryMapper() {
  const [hover, setHover] = useState<{
    row: string
    col: string
    count: number
    course: string
    faculty: string
  } | null>(null)

  const max = Math.max(
    ...multidisciplinaryMatrix.flat().map((c) => c.count),
    1,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multidisciplinary Mapper</CardTitle>
        <CardDescription>
          Home department (rows) → elective department (columns) · NEP 2020 cross-enrollment
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hover && (
          <div className="mb-4 rounded-lg border border-primary/20 bg-indigo-50 px-4 py-3 text-sm">
            <strong>
              {hover.row} → {hover.col}
            </strong>
            : {hover.count} students · {hover.course} · {hover.faculty}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-xs">
            <thead>
              <tr>
                <th className="p-2 text-left font-medium text-muted-foreground" />
                {DEPARTMENTS.map((d) => (
                  <th
                    key={d}
                    className="max-w-[80px] p-2 text-center font-medium text-muted-foreground"
                  >
                    {d.split(' ')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPARTMENTS.map((rowDept, ri) => (
                <tr key={rowDept}>
                  <td className="p-2 font-medium text-muted-foreground">
                    {rowDept.split(' ')[0]}
                  </td>
                  {DEPARTMENTS.map((colDept, ci) => {
                    const cell = multidisciplinaryMatrix[ri][ci]
                    const intensity = cell.count / max
                    return (
                      <td key={colDept} className="p-1">
                        <button
                          type="button"
                          disabled={ri === ci}
                          className={cn(
                            'flex h-12 w-full items-center justify-center rounded-md text-xs font-semibold transition-transform hover:scale-105',
                            ri === ci
                              ? 'bg-muted text-muted-foreground'
                              : 'text-white',
                          )}
                          style={
                            ri !== ci
                              ? {
                                  backgroundColor: `rgba(99, 102, 241, ${0.15 + intensity * 0.85})`,
                                }
                              : undefined
                          }
                          onMouseEnter={() =>
                            ri !== ci &&
                            setHover({
                              row: rowDept,
                              col: colDept,
                              count: cell.count,
                              course: cell.course,
                              faculty: cell.faculty,
                            })
                          }
                          onMouseLeave={() => setHover(null)}
                        >
                          {ri === ci ? '—' : cell.count}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
