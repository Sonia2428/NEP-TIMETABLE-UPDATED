import { AutoGeneration } from '@/components/generator/AutoGeneration'
import { PageHeader } from '@/components/shared/PageHeader'

export function GeneratorPage() {
  return (
    <>
      <PageHeader
        title="Timetable Generator"
        description="Configure constraints and NEP preferences, then run AI generation"
      />
      <AutoGeneration />
    </>
  )
}
