import { useState } from 'react'
import { FileJson, FileSpreadsheet, FileText, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useTimetable } from '@/context/TimetableContext'
import { exportOptions } from '@/data'

export function ExportPage() {
  const { downloadTimetable } = useTimetable()
  const [downloading, setDownloading] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const generate = async (id: string, title: string, format: string) => {
    setDownloading(id)
    setProgress(0)
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise((r) => setTimeout(r, 60))
    }
    downloadTimetable(format === 'XLSX' ? 'csv' : 'json')
    setDownloading(null)
    toast.success('Download ready', { description: `${title} exported from current timetable.` })
  }

  return (
    <>
      <PageHeader
        title="Reports & Export"
        description="PDF timetables, Excel data export, and NEP compliance reports"
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {exportOptions.map((opt) => (
          <Card key={opt.id} className="flex flex-col">
            <CardHeader>
              <div className="flex h-24 items-center justify-center rounded-lg bg-muted">
                {opt.format === 'PDF' ? (
                  <FileText className="size-10 text-red-500" />
                ) : (
                  <FileSpreadsheet className="size-10 text-emerald-600" />
                )}
              </div>
              <CardTitle className="mt-4 text-base">{opt.title}</CardTitle>
              <CardDescription>{opt.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{opt.format === 'XLSX' ? 'CSV' : 'JSON'}</Badge>
              {downloading === opt.id && (
                <div className="mt-4 space-y-1">
                  <Progress value={progress} />
                  <p className="text-xs text-muted-foreground">Generating... {progress}%</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={downloading !== null}
                onClick={() => generate(opt.id, opt.title, opt.format)}
              >
                {downloading === opt.id ? (
                  <Loader2 className="animate-spin" />
                ) : opt.format === 'XLSX' ? (
                  <FileSpreadsheet />
                ) : (
                  <FileJson />
                )}
                Generate &amp; Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
