import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="grid min-h-[80vh] place-items-center">
      <div className="flex flex-col gap-8 text-2xl font-light sm:gap-28 sm:flex-row">
        <Link
          className="flex sm:w-[175px] w-[112.5px] flex-col items-center gap-3 transition-transform duration-75 hover:scale-105"
          href="/case"
        >
          <p>Cases</p>
          <Image priority width={175} height={175} src="/images/case.webp" alt=""></Image>
        </Link>
        <Link
          className="flex sm:w-[175px] w-[112.5px] flex-col items-center gap-3 transition-transform duration-75 hover:scale-105"
          href="/souvenir"
        >
          <p>Souvenirs</p>
          <Image priority width={175} height={175} src="/images/souvenir.webp" alt=""></Image>
        </Link>
      </div>
    </main>
  );
}
