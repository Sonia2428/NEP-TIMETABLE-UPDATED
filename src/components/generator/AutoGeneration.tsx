import { useState } from 'react'
import { CheckCircle2, FileUp, Loader2, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { TimetablePreview } from '@/components/timetable/TimetablePreview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useTimetable } from '@/context/TimetableContext'

const steps = [
  'Parsing constraints',
  'Assigning faculty',
  'Resolving conflicts',
  'Finalizing schedule',
]

const sampleTimetable = `Day,Period,Course,Faculty,Room,Department,Notes
Mon,1,CS301,Dr. Priya Sharma,Room 101,Computer Science,
Mon,2,PHY201,Prof. Rohit Banerjee,Physics Lab,Physics,
Tue,6,CHM201,Prof. Divya Krishnan,Lab A,Chemistry,
Wed,4,CS302,Dr. Suresh Menon,Room 101,Computer Science,
Fri,2,ECO101,Prof. Arjun Patel,Room 202,Economics,5h/week`

export function AutoGeneration() {
  const { setTimetableFromText, resetTimetable, downloadTimetable } = useTimetable()
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [openElectives, setOpenElectives] = useState(true)
  const [multidisciplinary, setMultidisciplinary] = useState(true)
  const [timetableText, setTimetableText] = useState(sampleTimetable)

  const importTimetable = () => {
    const imported = setTimetableFromText(timetableText)
    if (imported === 0) {
      toast.error('No valid timetable rows found', {
        description: 'Use: Day, Period, Course, Faculty, Room, Department, Notes.',
      })
      return
    }

    toast.success('Timetable loaded', {
      description: `${imported} slots are now visible in dashboard and visualizations.`,
    })
  }

  const runGeneration = async () => {
    setRunning(true)
    setDone(false)
    setProgress(0)
    importTimetable()
    for (let i = 0; i < steps.length; i++) {
      setStep(i)
      for (let p = 0; p <= 25; p += 5) {
        setProgress(i * 25 + p)
        await new Promise((r) => setTimeout(r, 120))
      }
    }
    setProgress(100)
    setRunning(false)
    setDone(true)
    toast.success('Timetable generated successfully')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Timetable Auto-Generation</CardTitle>
          <CardDescription>
            NEP 2020-aligned multidisciplinary schedule builder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex gap-2">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setFormStep(n)}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                  formStep === n
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-muted-foreground'
                }`}
              >
                Step {n}
              </button>
            ))}
          </div>

          {formStep === 1 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label>Departments</Label>
                <Input type="number" defaultValue={6} className="mt-1" />
              </div>
              <div>
                <Label>Faculty count</Label>
                <Input type="number" defaultValue={24} className="mt-1" />
              </div>
              <div>
                <Label>Rooms</Label>
                <Input type="number" defaultValue={12} className="mt-1" />
              </div>
              <div>
                <Label>Days per week</Label>
                <Input type="number" defaultValue={5} className="mt-1" />
              </div>
              <div>
                <Label>Periods per day</Label>
                <Input type="number" defaultValue={8} className="mt-1" />
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Open electives (NEP)</p>
                  <p className="text-sm text-muted-foreground">
                    Cross-department elective slots
                  </p>
                </div>
                <Switch checked={openElectives} onCheckedChange={setOpenElectives} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Multidisciplinary mode</p>
                  <p className="text-sm text-muted-foreground">
                    Map home dept to elective dept flows
                  </p>
                </div>
                <Switch
                  checked={multidisciplinary}
                  onCheckedChange={setMultidisciplinary}
                />
              </div>
              <div>
                <Label>Credit hour target (per student)</Label>
                <Input type="number" defaultValue={120} className="mt-1 max-w-xs" />
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-5">
              <div>
                <Label>Give timetable</Label>
                <textarea
                  value={timetableText}
                  onChange={(event) => setTimetableText(event.target.value)}
                  className="mt-2 min-h-44 w-full resize-y rounded-lg border border-input bg-background p-3 text-sm outline-primary/30"
                  spellCheck={false}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Format: Day, Period, Course, Faculty, Room, Department, Notes
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={importTimetable}>
                  <FileUp />
                  Load Timetable
                </Button>
                <Button variant="outline" onClick={resetTimetable}>
                  <RotateCcw />
                  Reset Demo
                </Button>
                <Button variant="outline" onClick={() => downloadTimetable('csv')}>
                  Download CSV
                </Button>
              </div>

              {!done && (
                <>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={runGeneration}
                    disabled={running}
                  >
                    {running && <Loader2 className="animate-spin" />}
                    Run AI Generation
                  </Button>
                  {(running || progress > 0) && (
                    <div className="space-y-2">
                      <Progress value={progress} />
                      <p className="text-sm text-muted-foreground">
                        {running ? steps[step] : 'Complete'}... {progress}%
                      </p>
                    </div>
                  )}
                </>
              )}
              {done && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="size-5" />
                    <span className="font-semibold">Generation complete</span>
                  </div>
                  <ul className="mt-4 space-y-1 text-sm text-emerald-900">
                    <li>Timetable imported and visualized</li>
                    <li>Conflicts ready for resolver updates</li>
                    <li>Download available as CSV or JSON</li>
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" onClick={() => { setDone(false); setProgress(0) }}>
                      Regenerate
                    </Button>
                    <Button onClick={() => downloadTimetable('csv')}>
                      Download Timetable
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {formStep < 3 && (
            <Button onClick={() => setFormStep((s) => s + 1)}>Continue</Button>
          )}
        </CardContent>
      </Card>

      <TimetablePreview />
    </div>
  )
}
