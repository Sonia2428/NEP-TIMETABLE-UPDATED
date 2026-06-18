import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { DAYS, PERIODS, initialConflicts, initialTimetable, type Conflict, type TimetableEntry } from '@/data'

type TimetableContextValue = {
  timetable: TimetableEntry[]
  conflicts: Conflict[]
  openConflictCount: number
  setTimetableFromText: (value: string) => number
  resolveConflict: (id: string) => void
  resolveAllConflicts: () => number
  ignoreConflict: (id: string) => void
  resetTimetable: () => void
  downloadTimetable: (format?: 'csv' | 'json') => void
}

const TimetableContext = createContext<TimetableContextValue | null>(null)

function normalizeDay(value: string) {
  const match = DAYS.find((day) => day.toLowerCase() === value.trim().slice(0, 3).toLowerCase())
  return match ?? value.trim()
}

function parseTimetableText(value: string): TimetableEntry[] {
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const dataLines = lines[0]?.toLowerCase().startsWith('day,') ? lines.slice(1) : lines

  return dataLines
    .map((line, index): TimetableEntry | null => {
      const [day, period, course, faculty, room, department, notes] = line
        .split(',')
        .map((part) => part.trim())

      if (!day || !period || !course || !faculty || !room) return null

      return {
        id: `user-${Date.now()}-${index}`,
        day: normalizeDay(day),
        period: Number(period),
        course,
        faculty,
        room,
        department: department || 'General',
        notes: notes || undefined,
      }
    })
    .filter((entry): entry is TimetableEntry => Boolean(entry && Number.isFinite(entry.period)))
}

function csvEscape(value: string | number | undefined) {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function applyConflict(entry: TimetableEntry, conflict: Conflict): TimetableEntry {
  const [coursePart, detailPart] = conflict.after.slot.split('·').map((part) => part.trim())
  const afterDetail = detailPart || entry.room
  const isFaculty = afterDetail.includes('Dr.') || afterDetail.includes('Prof.')

  return {
    ...entry,
    day: conflict.after.day,
    period: conflict.after.period,
    course: coursePart || entry.course,
    room: isFaculty ? entry.room : afterDetail,
    faculty: isFaculty ? afterDetail : entry.faculty,
    notes: conflict.type === 'Credit Hour Violation' ? afterDetail : entry.notes,
  }
}

export function TimetableProvider({ children }: { children: ReactNode }) {
  const [timetable, setTimetable] = useState<TimetableEntry[]>(initialTimetable)
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts)

  const resolveConflict = (id: string) => {
    const conflict = conflicts.find((item) => item.id === id)
    if (!conflict) return

    setTimetable((prev) => {
      const index = prev.findIndex(
        (entry) =>
          entry.day === conflict.before.day &&
          entry.period === conflict.before.period &&
          conflict.before.slot.toLowerCase().includes(entry.course.toLowerCase()),
      )

      if (index === -1) {
        return [
          ...prev,
          applyConflict(
            {
              id: `resolved-${id}`,
              day: conflict.before.day,
              period: conflict.before.period,
              course: conflict.before.slot.split('·')[0]?.trim() || 'Updated slot',
              faculty: 'Assigned',
              room: 'Assigned',
              department: 'General',
            },
            conflict,
          ),
        ]
      }

      return prev.map((entry, entryIndex) =>
        entryIndex === index ? applyConflict(entry, conflict) : entry,
      )
    })

    setConflicts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'accepted' } : item)),
    )
  }

  const value = useMemo<TimetableContextValue>(() => {
    const openConflictCount = conflicts.filter((conflict) => conflict.status === 'open').length

    return {
      timetable,
      conflicts,
      openConflictCount,
      setTimetableFromText: (text) => {
        const parsed = parseTimetableText(text)
        if (parsed.length > 0) setTimetable(parsed)
        return parsed.length
      },
      resolveConflict,
      resolveAllConflicts: () => {
        const openIds = conflicts.filter((conflict) => conflict.status === 'open').map((conflict) => conflict.id)
        openIds.forEach(resolveConflict)
        return openIds.length
      },
      ignoreConflict: (id) =>
        setConflicts((prev) =>
          prev.map((conflict) =>
            conflict.id === id ? { ...conflict, status: 'ignored' } : conflict,
          ),
        ),
      resetTimetable: () => {
        setTimetable(initialTimetable)
        setConflicts(initialConflicts)
      },
      downloadTimetable: (format = 'csv') => {
        if (format === 'json') {
          downloadFile('nep-timetable.json', JSON.stringify(timetable, null, 2), 'application/json')
          return
        }

        const header = ['Day', 'Period', 'Course', 'Faculty', 'Room', 'Department', 'Notes']
        const rows = timetable.map((entry) => [
          entry.day,
          entry.period,
          entry.course,
          entry.faculty,
          entry.room,
          entry.department,
          entry.notes,
        ])
        const content = [header, ...rows]
          .map((row) => row.map(csvEscape).join(','))
          .join('\n')
        downloadFile('nep-timetable.csv', content, 'text/csv;charset=utf-8')
      },
    }
  }, [conflicts, timetable])

  return <TimetableContext.Provider value={value}>{children}</TimetableContext.Provider>
}

export function useTimetable() {
  const context = useContext(TimetableContext)
  if (!context) throw new Error('useTimetable must be used inside TimetableProvider')
  return context
}

export function getSlotLoad(timetable: TimetableEntry[]) {
  return DAYS.flatMap((day) =>
    PERIODS.map((period) => ({
      day,
      period,
      count: timetable.filter((entry) => entry.day === day && entry.period === period).length,
    })),
  )
}

