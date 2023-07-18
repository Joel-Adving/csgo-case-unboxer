import { Crate } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export default function Grid({ crates }: { crates: Crate[] }) {
  return (
    <div className="gap-6 responsive-grid">
      {crates
        ?.slice()
        ?.reverse()
        ?.map((_case, i) => (
          <Link key={_case.id} href={`/case/${_case.id}`}>
            <div key={i} className="transition-transform duration-75 cursor-pointer hover:scale-105">
              <Image width={300} height={300} priority src={_case.image ?? '/images/placeholder.webp'} alt="" />
              <p className="mt-2 text-sm text-center">{_case.name}</p>
            </div>
          </Link>
        ))}
    </div>
  )
}
