'use client'

import { useGetCasesQuery, useGetSouvenirsQuery } from '@/redux/services/csgoApi'
import { Case } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type CaseType = 'case' | 'souvenir'

const Grid = ({ cases }: { cases: Case[] }) => {
  return (
    <div className="grid gap-5 responsiveGrid">
      {cases
        ?.slice()
        ?.reverse()
        ?.map((_case, i) => (
          <Link key={_case.id} href={`/case/${_case.id}`}>
            <div key={i} className="transition-transform duration-75 cursor-pointer hover:scale-105">
              <Image width={300} height={300} priority src={_case.image} alt="" />
              <p className="mt-2 text-center">{_case.name}</p>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default function CaseGrid({ type }: { type: CaseType }) {
  const { data: cases } = useGetCasesQuery(null, {
    skip: type !== 'case'
  })

  const { data: souvenirs } = useGetSouvenirsQuery(null, {
    skip: type !== 'souvenir'
  })

  console.log(souvenirs)

  if (cases?.length) {
    return <Grid cases={cases} />
  }

  if (souvenirs?.length) {
    return <Grid cases={souvenirs} />
  }

  return null
}
