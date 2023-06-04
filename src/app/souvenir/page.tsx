import Grid from '@/components/CaseGrid'
import { getSouvenirs } from '@/utils/serverFunctions'

export default async function SouvenirPage() {
  const souvenirs = await getSouvenirs()
  return <Grid crates={souvenirs} />
}
