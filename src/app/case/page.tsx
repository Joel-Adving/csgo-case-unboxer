import Grid from '@/components/CaseGrid';
import { getCases } from '@/utils/serverFunctions';

export default async function CasePage() {
  const cases = await getCases();
  console.log(cases);
  return (
    <div className="mt-6">
      <Grid crates={cases} />
    </div>
  );
}
