import { Case } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function Grid({ cases }: { cases: Case[] }) {
  return (
    <div className="grid gap-5 responsiveGrid p-[8vh]">
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
