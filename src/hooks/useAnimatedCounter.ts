import { useEffect, useState } from 'react'

export function useAnimatedCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = 0
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(target * eased)
      setValue(start)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [target, duration])

  return value
}
