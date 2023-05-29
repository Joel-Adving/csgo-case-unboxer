import Grid from '@/components/CaseGrid'
import { getCases } from '@/server/serverFunctions'

export default async function CasePage() {
  const cases = await getCases()
  return <Grid cases={cases} />
}
