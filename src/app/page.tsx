import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative grid w-full max-w-5xl min-h-[90vh] p-3 mx-auto place-items-center">
      <div className="flex flex-col gap-4 text-3xl sm:gap-20 font-extralight sm:flex-row">
        <Link className="flex flex-col items-center transition-transform duration-75 hover:scale-105" href="/case">
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
          Cases
        </Link>
        <Link className="flex flex-col items-center transition-transform duration-75 hover:scale-105" href="/souvenir">
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
          Souvenirs
        </Link>
      </div>
    </main>
  )
}
