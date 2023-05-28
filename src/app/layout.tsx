import Providers from '@/utils/Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import Inventory from '@/components/Inventory'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CS:GO Unbox Simulator',
  description: 'Unbox CS:GO skin cases, sticker capsules and souvenir packages.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="relative flex flex-col w-full max-w-5xl p-3 mx-auto">
            {children}
            <Inventory />
          </main>
        </Providers>
      </body>
    </html>
  )
}
