import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="grid min-h-[80vh] place-items-center">
      <div className="flex flex-col gap-16 text-2xl sm:gap-28 font-extralight sm:flex-row">
        <Link className="flex flex-col items-center gap-3 transition-transform duration-75 hover:scale-105" href="/case">
          <p>Cases</p>
          <Image
            priority
            style={{
              width: 200
            }}
            width={300}
            height={300}
            src="/images/case.webp"
            alt=""
          ></Image>
        </Link>
        <Link className="flex flex-col items-center gap-3 transition-transform duration-75 hover:scale-105" href="/souvenir">
          <p>Souvenirs</p>
          <Image
            priority
            style={{
              width: 200
            }}
            width={300}
            height={300}
            src="/images/souvenir.webp"
            alt=""
          ></Image>
        </Link>
      </div>
    </main>
  )
}
