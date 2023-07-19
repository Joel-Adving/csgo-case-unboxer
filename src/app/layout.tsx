import Providers from '@/utils/Providers'
import Header from '@/components/Header'
import './globals.css'

export const metadata = {
  title: 'CS:GO Unbox Simulator',
  description: 'Unbox CS:GO skin cases, sticker capsules and souvenir packages.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="relative w-full max-w-5xl p-3 mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
