import { useState } from 'react'
import { motion } from 'framer-motion'
import { Undo2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfidenceBar } from '@/components/shared/ConfidenceBar'
import { smartSuggestions, type Suggestion } from '@/data'

const categoryLabel = {
  slot: 'Slot',
  workload: 'Workload',
  room: 'Room',
  nep: 'NEP',
}

export function SmartSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(smartSuggestions)
  const [lastApplied, setLastApplied] = useState<string | null>(null)

  const apply = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: true } : s)),
    )
    setLastApplied(id)
    toast.success('Suggestion applied', {
      description: 'Schedule updated. You can undo this action.',
    })
  }

  const undo = () => {
    if (!lastApplied) return
    setSuggestions((prev) =>
      prev.map((s) => (s.id === lastApplied ? { ...s, applied: false } : s)),
    )
    setLastApplied(null)
    toast.info('Suggestion reverted')
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Smart Suggestions</CardTitle>
            <CardDescription>AI-generated schedule improvements</CardDescription>
          </div>
          {lastApplied && (
            <Button variant="outline" size="sm" onClick={undo}>
              <Undo2 className="size-3.5" />
              Undo
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="max-h-[520px] space-y-3 overflow-y-auto">
        {suggestions.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-lg border border-border p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-primary">
                {categoryLabel[s.category]}
              </span>
              {s.applied && (
                <span className="text-xs text-emerald-600">Applied</span>
              )}
            </div>
            <p className="mt-1 font-medium text-sm">{s.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
            <div className="mt-3">
              <ConfidenceBar score={s.confidence} />
            </div>
            <Button
              size="sm"
              className="mt-3 w-full"
              variant={s.applied ? 'secondary' : 'default'}
              disabled={s.applied}
              onClick={() => apply(s.id)}
            >
              Apply Suggestion
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
