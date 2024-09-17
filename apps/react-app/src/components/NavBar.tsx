import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 pb-5">
      <div className="flex-1">
        <Link href="/" className="p-5">
          <Image
            className="dark:invert"
            src="/favicon.ico"
            alt="Logo"
            width={120}
            height={50}
            priority
          />
        </Link>
      </div>
      <div className="flex-none prose">
        <h2>Earthquake Stats</h2>
      </div>
    </div>
  )
}
