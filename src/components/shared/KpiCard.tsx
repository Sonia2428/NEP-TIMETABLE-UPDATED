import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { cn } from '@/lib/utils'

type KpiCardProps = {
  label: string
  value: number
  change: number
  trend: 'up' | 'down'
  icon: LucideIcon
  warning?: boolean
}

export function KpiCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  warning,
}: KpiCardProps) {
  const animated = useAnimatedCounter(value)
  const positive = warning ? trend === 'down' : trend === 'up'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-foreground">
                {animated}
              </p>
              <div
                className={cn(
                  'mt-2 flex items-center gap-1 text-xs font-medium',
                  positive ? 'text-emerald-600' : 'text-red-500',
                )}
              >
                {trend === 'up' ? (
                  <ArrowUp className="size-3.5" />
                ) : (
                  <ArrowDown className="size-3.5" />
                )}
                {Math.abs(change)}% vs last term
              </div>
            </div>
            <div
              className={cn(
                'rounded-lg p-2.5',
                warning ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-primary',
              )}
            >
              <Icon className="size-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
