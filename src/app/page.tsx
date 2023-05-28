import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative grid w-full max-w-5xl min-h-[90vh] p-3 mx-auto place-items-center">
      <div className="flex text-5xl gap-14 font-extralight">
        <Link className="hover:underline" href="/case">
          Cases
        </Link>
        <Link className="hover:underline" href="/souvenir">
          Souvenirs
        </Link>
      </div>
    </main>
  )
}
