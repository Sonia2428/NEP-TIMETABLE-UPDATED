import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { initialAlerts, type AlertItem } from '@/data'
import { cn } from '@/lib/utils'

const alertVariant = {
  Critical: 'destructive' as const,
  Warning: 'warning' as const,
  Info: 'info' as const,
}

export function AlertFeed() {
  const [collapsed, setCollapsed] = useState(true)
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts)
  const [expanded, setExpanded] = useState<string | null>(null)

  const unresolved = alerts.filter((a) => !a.resolved).length

  if (collapsed) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={() => setCollapsed(false)}
          className="relative shadow-lg"
        >
          <Bell className="size-4" />
          {unresolved > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unresolved}
            </span>
          )}
        </Button>
      </div>
    )
  }

  return (
    <aside className="fixed top-0 right-0 z-40 flex h-svh w-80 max-w-[calc(100vw-1rem)] flex-col border-l border-border bg-card shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-primary" />
          <span className="text-sm font-semibold">Conflict Alerts</span>
          <Badge variant="destructive">{unresolved}</Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)}>
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <ul className="space-y-2 p-3">
          <AnimatePresence>
            {alerts.map((alert) => (
              <li key={alert.id}>
                <motion.div
                  layout
                  className={cn(
                    'rounded-lg border border-border p-3 transition-opacity',
                    alert.resolved && 'opacity-50',
                  )}
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() =>
                      setExpanded(expanded === alert.id ? null : alert.id)
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant={alertVariant[alert.type]} className="shrink-0">
                        {alert.type}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'mt-2 text-sm font-medium',
                        alert.resolved && 'line-through',
                      )}
                    >
                      {alert.message}
                    </p>
                  </button>
                  <AnimatePresence>
                    {expanded === alert.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-xs text-muted-foreground">
                          {alert.detail}
                        </p>
                        {!alert.resolved && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 w-full"
                            onClick={() =>
                              setAlerts((prev) =>
                                prev.map((a) =>
                                  a.id === alert.id ? { ...a, resolved: true } : a,
                                ),
                              )
                            }
                          >
                            Mark as Resolved
                          </Button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            ))}
          </AnimatePresence>
        </ul>
      </ScrollArea>
      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          onClick={() => setCollapsed(true)}
        >
          <ChevronLeft className="mr-1 size-3" />
          Collapse feed
        </Button>
      </div>
    </aside>
  )
}
