import Link from 'next/link'
import Inventory from './Inventory'

export default function Header() {
  return (
    <header className="sticky top-0 z-[10] bg-slate-900">
      <nav className="flex items-center justify-between w-full max-w-5xl p-3 mx-auto">
        <Link href="/">Home</Link>
        <Inventory />
      </nav>
    </header>
  )
}
