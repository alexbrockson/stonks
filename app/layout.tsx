import Link from 'next/link'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="center-site">
        <div className="navbar bg-neutral">
          <div className="flex-1">
            <Link href={'./'} className="btn btn-ghost normal-case text-xl">Stonks</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href={'/watchlists'}>Watchlists</Link></li>
            </ul>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}