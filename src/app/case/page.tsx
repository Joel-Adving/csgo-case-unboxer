import Grid from '@/components/CaseGrid'
import { getCases } from '@/utils/serverFunctions'

export default async function CasePage() {
  const cases = await getCases()
  return <Grid crates={cases} />
}
