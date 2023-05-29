import Grid from '@/components/CaseGrid'
import { getSouvenirs } from '@/server/serverFunctions'

export default async function SouvenirPage() {
  const souvenirs = await getSouvenirs()
  return <Grid cases={souvenirs} />
}
