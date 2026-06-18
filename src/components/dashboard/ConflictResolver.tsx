import { useState } from 'react'
import { Loader2, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTimetable } from '@/context/TimetableContext'
import { type Severity } from '@/data'
import { cn } from '@/lib/utils'

const severityVariant: Record<Severity, 'destructive' | 'warning' | 'info'> = {
  Critical: 'destructive',
  Warning: 'warning',
  Info: 'info',
}

export function ConflictResolver() {
  const { conflicts, openConflictCount, resolveConflict, resolveAllConflicts, ignoreConflict } = useTimetable()
  const [resolving, setResolving] = useState(false)
  const [acceptedPreview, setAcceptedPreview] = useState<string | null>(null)

  const autoResolveAll = async () => {
    setResolving(true)
    await new Promise((r) => setTimeout(r, 900))
    const resolved = resolveAllConflicts()
    setResolving(false)
    toast.success('All conflicts auto-resolved', {
      description: `${resolved} scheduling issues fixed and written to the timetable.`,
    })
  }

  const acceptFix = (id: string) => {
    resolveConflict(id)
    setAcceptedPreview(id)
    toast.success('Fix applied', { description: 'Timetable slot updated.' })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>AI Conflict Resolver</CardTitle>
          <CardDescription>
            {openConflictCount} open conflict{openConflictCount !== 1 ? 's' : ''} detected
          </CardDescription>
        </div>
        <Button onClick={autoResolveAll} disabled={resolving || openConflictCount === 0}>
          {resolving ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Wand2 />
          )}
          Auto-Resolve All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {conflicts.map((conflict) => (
          <div
            key={conflict.id}
            className={cn(
              'rounded-lg border p-4 transition-colors',
              conflict.status === 'ignored' && 'opacity-50',
              conflict.status === 'accepted' && 'border-emerald-200 bg-emerald-50/50',
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium text-foreground">{conflict.type}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {conflict.entities}
                </p>
              </div>
              <Badge variant={severityVariant[conflict.severity]}>
                {conflict.severity}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-primary">
              Suggested: {conflict.suggestion}
            </p>

            {(acceptedPreview === conflict.id || conflict.status === 'accepted') && (
              <div className="mt-3 grid gap-2 rounded-md border border-border bg-muted/40 p-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Before</p>
                  <p className="text-sm">
                    {conflict.before.day} P{conflict.before.period} - {conflict.before.slot}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-emerald-600">After</p>
                  <p className="text-sm">
                    {conflict.after.day} P{conflict.after.period} - {conflict.after.slot}
                  </p>
                </div>
              </div>
            )}

            {conflict.status === 'open' && (
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={() => acceptFix(conflict.id)}>
                  Resolve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => ignoreConflict(conflict.id)}
                >
                  Ignore
                </Button>
              </div>
            )}
            {conflict.status === 'accepted' && (
              <p className="mt-2 text-xs font-medium text-emerald-600">Resolved and updated in timetable</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
