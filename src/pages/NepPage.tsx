import { CreditTracker } from '@/components/nep/CreditTracker'
import { MultidisciplinaryMapper } from '@/components/nep/MultidisciplinaryMapper'
import { PageHeader } from '@/components/shared/PageHeader'

export function NepPage() {
  return (
    <>
      <PageHeader
        title="NEP 2020 Compliance"
        description="Multidisciplinary mapper, credit tracking, and open elective alignment"
      />
      <div className="space-y-8">
        <MultidisciplinaryMapper />
        <CreditTracker />
      </div>
    </>
  )
}
