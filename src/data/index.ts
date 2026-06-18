export const DEPARTMENTS = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'English',
  'Economics',
  'Chemistry',
] as const

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
export const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8] as const

export type TimetableEntry = {
  id: string
  day: string
  period: number
  course: string
  faculty: string
  room: string
  department: string
  notes?: string
}

export const ROOMS = [
  { id: 'r1', name: 'Lab A', type: 'lab', utilization: 92 },
  { id: 'r2', name: 'Lab B', type: 'lab', utilization: 78 },
  { id: 'r3', name: 'Lab C', type: 'lab', utilization: 65 },
  { id: 'r4', name: 'Seminar Hall 1', type: 'seminar', utilization: 88 },
  { id: 'r5', name: 'Seminar Hall 2', type: 'seminar', utilization: 71 },
  { id: 'r6', name: 'Room 101', type: 'classroom', utilization: 54 },
  { id: 'r7', name: 'Room 102', type: 'classroom', utilization: 48 },
  { id: 'r8', name: 'Room 201', type: 'classroom', utilization: 83 },
  { id: 'r9', name: 'Room 202', type: 'classroom', utilization: 61 },
  { id: 'r10', name: 'Auditorium', type: 'hall', utilization: 95 },
  { id: 'r11', name: 'Physics Lab', type: 'lab', utilization: 89 },
  { id: 'r12', name: 'Chemistry Lab', type: 'lab', utilization: 42 },
] as const

export const FACULTY = [
  { id: 'f1', name: 'Dr. Priya Sharma', dept: 'Computer Science', teaching: 14, free: 6, admin: 4 },
  { id: 'f2', name: 'Dr. Rajesh Kumar', dept: 'Computer Science', teaching: 16, free: 4, admin: 4 },
  { id: 'f3', name: 'Prof. Ananya Iyer', dept: 'Mathematics', teaching: 12, free: 8, admin: 4 },
  { id: 'f4', name: 'Dr. Vikram Singh', dept: 'Physics', teaching: 15, free: 5, admin: 4 },
  { id: 'f5', name: 'Dr. Meera Nair', dept: 'English', teaching: 10, free: 10, admin: 4 },
  { id: 'f6', name: 'Prof. Arjun Patel', dept: 'Economics', teaching: 13, free: 7, admin: 4 },
  { id: 'f7', name: 'Dr. Kavita Rao', dept: 'Chemistry', teaching: 14, free: 6, admin: 4 },
  { id: 'f8', name: 'Dr. Suresh Menon', dept: 'Computer Science', teaching: 18, free: 2, admin: 4 },
  { id: 'f9', name: 'Dr. Lakshmi Das', dept: 'Mathematics', teaching: 11, free: 9, admin: 4 },
  { id: 'f10', name: 'Prof. Rohit Banerjee', dept: 'Physics', teaching: 17, free: 3, admin: 4 },
  { id: 'f11', name: 'Dr. Neha Gupta', dept: 'English', teaching: 9, free: 11, admin: 4 },
  { id: 'f12', name: 'Dr. Amit Choudhury', dept: 'Economics', teaching: 12, free: 8, admin: 4 },
  { id: 'f13', name: 'Prof. Divya Krishnan', dept: 'Chemistry', teaching: 15, free: 5, admin: 4 },
  { id: 'f14', name: 'Dr. Karan Mehta', dept: 'Computer Science', teaching: 13, free: 7, admin: 4 },
  { id: 'f15', name: 'Dr. Pooja Reddy', dept: 'Mathematics', teaching: 14, free: 6, admin: 4 },
  { id: 'f16', name: 'Prof. Sanjay Joshi', dept: 'Physics', teaching: 10, free: 10, admin: 4 },
  { id: 'f17', name: 'Dr. Ritu Verma', dept: 'English', teaching: 11, free: 9, admin: 4 },
  { id: 'f18', name: 'Dr. Manish Agarwal', dept: 'Economics', teaching: 16, free: 4, admin: 4 },
  { id: 'f19', name: 'Prof. Sunita Pillai', dept: 'Chemistry', teaching: 12, free: 8, admin: 4 },
  { id: 'f20', name: 'Dr. Arun Nambiar', dept: 'Computer Science', teaching: 15, free: 5, admin: 4 },
  { id: 'f21', name: 'Dr. Ishita Bose', dept: 'Mathematics', teaching: 13, free: 7, admin: 4 },
  { id: 'f22', name: 'Prof. Deepak Saxena', dept: 'Physics', teaching: 14, free: 6, admin: 4 },
  { id: 'f23', name: 'Dr. Tanvi Shah', dept: 'English', teaching: 8, free: 12, admin: 4 },
  { id: 'f24', name: 'Dr. Harish Malhotra', dept: 'Economics', teaching: 11, free: 9, admin: 4 },
] as const

export const COURSES = [
  'CS301 — Data Structures',
  'CS401 — Machine Learning',
  'MA201 — Linear Algebra',
  'MA301 — Probability',
  'PHY102 — Mechanics',
  'PHY201 — Quantum Basics',
  'ENG201 — Academic Writing',
  'ECO101 — Microeconomics',
  'CHM201 — Organic Chemistry',
  'CS302 — Operating Systems',
] as const

export const initialTimetable: TimetableEntry[] = [
  { id: 'tt1', day: 'Mon', period: 1, course: 'CS301', faculty: 'Dr. Priya Sharma', room: 'Room 101', department: 'Computer Science' },
  { id: 'tt2', day: 'Mon', period: 2, course: 'PHY201', faculty: 'Prof. Rohit Banerjee', room: 'Physics Lab', department: 'Physics' },
  { id: 'tt3', day: 'Mon', period: 3, course: 'PHY102', faculty: 'Prof. Rohit Banerjee', room: 'Room 201', department: 'Physics' },
  { id: 'tt4', day: 'Tue', period: 5, course: 'CS401', faculty: 'Dr. Suresh Menon', room: 'Lab A', department: 'Computer Science' },
  { id: 'tt5', day: 'Tue', period: 6, course: 'PHY201', faculty: 'Dr. Vikram Singh', room: 'Lab A', department: 'Physics' },
  { id: 'tt6', day: 'Tue', period: 6, course: 'CHM201', faculty: 'Prof. Divya Krishnan', room: 'Lab A', department: 'Chemistry' },
  { id: 'tt7', day: 'Wed', period: 4, course: 'CS401', faculty: 'Dr. Suresh Menon', room: 'Lab B', department: 'Computer Science' },
  { id: 'tt8', day: 'Wed', period: 4, course: 'CS302', faculty: 'Dr. Suresh Menon', room: 'Room 101', department: 'Computer Science' },
  { id: 'tt9', day: 'Thu', period: 1, course: 'ENG201', faculty: 'Dr. Meera Nair', room: 'Seminar Hall 2', department: 'English', notes: '2 sections - 40% cap' },
  { id: 'tt10', day: 'Fri', period: 2, course: 'ECO101', faculty: 'Prof. Arjun Patel', room: 'Room 202', department: 'Economics', notes: '5h/week' },
]

export type ConflictType =
  | 'Faculty Double Booking'
  | 'Room Overlap'
  | 'Credit Hour Violation'

export type Severity = 'Critical' | 'Warning' | 'Info'

export type Conflict = {
  id: string
  type: ConflictType
  severity: Severity
  entities: string
  suggestion: string
  before: { day: string; period: number; slot: string }
  after: { day: string; period: number; slot: string }
  status: 'open' | 'accepted' | 'ignored'
}

export const initialConflicts: Conflict[] = [
  {
    id: 'c1',
    type: 'Faculty Double Booking',
    severity: 'Critical',
    entities: 'Dr. Suresh Menon — Wed P4 & P5 (CS401, CS302)',
    suggestion: 'Move CS302 to Thu P3 in Room 201',
    before: { day: 'Wed', period: 4, slot: 'CS302 · Room 101' },
    after: { day: 'Thu', period: 3, slot: 'CS302 · Room 201' },
    status: 'open',
  },
  {
    id: 'c2',
    type: 'Room Overlap',
    severity: 'Warning',
    entities: 'Lab A — Tue P6 (PHY201) & P7 (CHM201)',
    suggestion: 'Shift CHM201 to Chemistry Lab P6',
    before: { day: 'Tue', period: 6, slot: 'CHM201 · Lab A' },
    after: { day: 'Tue', period: 6, slot: 'CHM201 · Chemistry Lab' },
    status: 'open',
  },
  {
    id: 'c3',
    type: 'Credit Hour Violation',
    severity: 'Warning',
    entities: 'ECO101 section B exceeds 4 credits/week cap',
    suggestion: 'Split tutorial to alternate week pattern',
    before: { day: 'Fri', period: 2, slot: 'ECO101 · 5h/week' },
    after: { day: 'Fri', period: 2, slot: 'ECO101 · 4h/week' },
    status: 'open',
  },
  {
    id: 'c4',
    type: 'Faculty Double Booking',
    severity: 'Critical',
    entities: 'Prof. Rohit Banerjee — Mon P2 & P3',
    suggestion: 'Assign PHY201 lab to Dr. Vikram Singh',
    before: { day: 'Mon', period: 2, slot: 'PHY201 · Physics Lab' },
    after: { day: 'Mon', period: 2, slot: 'PHY201 · Dr. Vikram Singh' },
    status: 'open',
  },
  {
    id: 'c5',
    type: 'Room Overlap',
    severity: 'Info',
    entities: 'Seminar Hall 2 — Thu P1 low utilization conflict',
    suggestion: 'Merge ENG201 sections into single slot',
    before: { day: 'Thu', period: 1, slot: '2 sections · 40% cap' },
    after: { day: 'Thu', period: 1, slot: '1 section · 75% cap' },
    status: 'open',
  },
]

export type Suggestion = {
  id: string
  category: 'slot' | 'workload' | 'room' | 'nep'
  title: string
  detail: string
  confidence: number
  applied?: boolean
}

export const smartSuggestions: Suggestion[] = [
  { id: 's1', category: 'slot', title: 'Optimal CS401 placement', detail: 'Move ML lecture to Tue P5 for better lab continuity.', confidence: 94 },
  { id: 's2', category: 'workload', title: 'Balance Dr. Suresh Menon', detail: 'Redistribute 2 tutorials to Dr. Karan Mehta (within 18h cap).', confidence: 88 },
  { id: 's3', category: 'room', title: 'Upgrade Seminar Hall 1', detail: 'Swap ENG201 to Auditorium for combined NEP elective cohort.', confidence: 76 },
  { id: 's4', category: 'nep', title: 'Open elective cluster', detail: 'Align CS–ECO–ENG electives on Wed P7–P8 for cross-dept access.', confidence: 91 },
  { id: 's5', category: 'slot', title: 'Physics lab sequencing', detail: 'Schedule PHY102 before PHY201 on consecutive periods.', confidence: 82 },
  { id: 's6', category: 'workload', title: 'Mathematics load smoothing', detail: 'Shift MA301 from Fri heavy block to Thu P4.', confidence: 67 },
  { id: 's7', category: 'room', title: 'Lab C underuse', detail: 'Route CHM201 practicals to Lab C (currently 65% util).', confidence: 58 },
  { id: 's8', category: 'nep', title: 'Vocational credit gap', detail: '12 students below vocational minimum — add CHM201 workshop.', confidence: 45 },
  { id: 's9', category: 'slot', title: 'Saturday optional periods', detail: 'Use Sat P1–P2 for remedial multidisciplinary modules.', confidence: 72 },
  { id: 's10', category: 'workload', title: 'Admin hour buffer', detail: 'Reserve Fri P8 for all CS faculty admin (NEP documentation).', confidence: 85 },
]

export type AlertItem = {
  id: string
  type: 'Critical' | 'Warning' | 'Info'
  message: string
  detail: string
  timestamp: string
  resolved: boolean
}

export const initialAlerts: AlertItem[] = [
  { id: 'a1', type: 'Critical', message: 'Faculty double booking detected', detail: 'Dr. Suresh Menon scheduled twice Wed P4–P5.', timestamp: '10:42 AM', resolved: false },
  { id: 'a2', type: 'Warning', message: 'Room overlap in Lab A', detail: 'PHY201 and CHM201 collide Tue P6–P7.', timestamp: '10:38 AM', resolved: false },
  { id: 'a3', type: 'Info', message: 'NEP elective window available', detail: 'Wed P7–P8 has capacity for 120 cross-dept students.', timestamp: '10:15 AM', resolved: false },
  { id: 'a4', type: 'Warning', message: 'Credit hour cap exceeded', detail: 'ECO101 section B at 5h/week.', timestamp: '09:55 AM', resolved: false },
  { id: 'a5', type: 'Info', message: 'Optimizer run complete', detail: 'Last generation: 186 courses, 3 conflicts auto-resolved.', timestamp: '09:30 AM', resolved: true },
]

export const kpiMetrics = [
  { label: 'Total Courses Scheduled', value: 186, change: 12, trend: 'up' as const },
  { label: 'Faculty Assigned', value: 24, change: 0, trend: 'up' as const },
  { label: 'Rooms Utilized', value: 11, change: -1, trend: 'down' as const },
  { label: 'Conflicts Pending', value: 5, change: -2, trend: 'down' as const, warning: true },
]

export function generateHeatmap(filter: 'department' | 'faculty' | 'room' = 'department') {
  const seed = filter === 'department' ? 1 : filter === 'faculty' ? 2 : 3
  return DAYS.flatMap((day, di) =>
    PERIODS.map((period, pi) => {
      const load = ((di * 3 + pi * 2 + seed * 5) % 10) / 10
      const courses = Math.floor(load * 6)
      const rooms = Math.min(courses + 1, 4)
      return { day, period, load, courses, rooms }
    }),
  )
}

export const facultyDonutDisplay = FACULTY.slice(0, 8)

export const roomWeeklyHours = ROOMS.map((r, i) => ({
  room: r.name,
  occupied: Math.round((r.utilization / 100) * 40),
  free: Math.round(((100 - r.utilization) / 100) * 30),
  maintenance: (i % 4) + 1,
  utilization: r.utilization,
}))

export const avgRoomUtilization = Math.round(
  ROOMS.reduce((s, r) => s + r.utilization, 0) / ROOMS.length,
)

export const multidisciplinaryMatrix = DEPARTMENTS.map((_, ri) =>
  DEPARTMENTS.map((_col, ci) => {
    if (ri === ci) return { count: 0, course: '—', faculty: '—' }
    const count = Math.floor(((ri + 1) * (ci + 2) * 7) % 45) + 5
    return {
      count,
      course: COURSES[(ri + ci) % COURSES.length],
      faculty: FACULTY[(ri + ci) % FACULTY.length].name,
    }
  }),
)

export type StudentCredit = {
  id: string
  program: string
  major: number
  minor: number
  openElective: number
  vocational: number
  total: number
  nepTarget: number
  status: 'Met' | 'Pending' | 'Overloaded'
}

const programs = ['B.Tech CS', 'B.Sc Physics', 'B.A English', 'B.Com Economics', 'B.Sc Chemistry', 'B.Sc Math']

export const students: StudentCredit[] = Array.from({ length: 40 }, (_, i) => {
  const major = 40 + (i % 12)
  const minor = 12 + (i % 8)
  const openElective = 8 + (i % 10)
  const vocational = 4 + (i % 6)
  const total = major + minor + openElective + vocational
  const nepTarget = 120
  let status: StudentCredit['status'] = 'Met'
  if (total < nepTarget - 5) status = 'Pending'
  if (total > nepTarget + 8) status = 'Overloaded'
  return {
    id: `STU${String(2024001 + i).slice(-7)}`,
    program: programs[i % programs.length],
    major,
    minor,
    openElective,
    vocational,
    total,
    nepTarget,
    status,
  }
})

export const creditDistributionChart = students.map((s) => ({
  id: s.id.slice(-4),
  major: s.major,
  minor: s.minor,
  openElective: s.openElective,
  vocational: s.vocational,
}))

export type AvailabilityStatus = 'available' | 'assigned' | 'unavailable' | 'leave'

export function getFacultyAvailability(
  facultyId: string,
): AvailabilityStatus[][] {
  const hash = facultyId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return DAYS.map((_, di) =>
    PERIODS.map((_, pi) => {
      const v = (hash + di * 7 + pi * 3) % 10
      if (v === 0) return 'leave'
      if (v === 1) return 'unavailable'
      if (v < 5) return 'assigned'
      return 'available'
    }),
  )
}

export const exportOptions = [
  { id: 'e1', title: 'Full Timetable PDF', desc: 'All departments, 5 days × 8 periods', format: 'PDF', icon: 'pdf' },
  { id: 'e2', title: 'Faculty Schedule PDF', desc: 'Per-faculty weekly breakdown', format: 'PDF', icon: 'pdf' },
  { id: 'e3', title: 'Room Schedule PDF', desc: 'Room-wise occupancy calendar', format: 'PDF', icon: 'pdf' },
  { id: 'e4', title: 'Full Data Export', desc: 'Courses, faculty, rooms, conflicts', format: 'XLSX', icon: 'xlsx' },
  { id: 'e5', title: 'NEP Compliance Report', desc: 'Credits, electives, multidisciplinary map', format: 'PDF', icon: 'pdf' },
]

export const CHART_COLORS = {
  primary: '#6366F1',
  teal: '#14B8A6',
  amber: '#F59E0B',
  red: '#EF4444',
  blue: '#3B82F6',
  gray: '#94A3B8',
  indigo: '#818CF8',
}
