'use client'
import { useState, useEffect } from 'react'
import { Logo } from "./logo"
import { ScrollArea } from '@/components/ui/scroll-area'
import { allCategories } from '@/lib/twist-icons'
import { useSearchParams, usePathname } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'

export function IconSider() {
  const pathname = usePathname()
  const s = useSearchParams().get('s') ?? ''
  const [active, setActive] = useState('all')

  useEffect(() => {
    const currentPath = pathname.split('/').pop() as string
    setActive(currentPath)
  }, [pathname])

  return (
    <ScrollArea className='w-60 h-full border-r'>
      <div className='px-2'>
        <Logo className='flex justify-center sticky top-0 z-50 border-b py-1 bg-background' />
        <aside>
          {
            allCategories().map((item) => (
              <Link
                href={{
                  pathname: `/icons/${item.key}`,
                  query: s ? { s } : {}
                }}
                key={item.key}
                prefetch={false}
              >
                <div
                  className={
                    clsx(
                      ['text-base text-center p-2 border-b text-muted-foreground font-medium dark:hover:text-slate-50 hover:text-slate-800'],
                      [item.key === active && 'dark:text-slate-50 text-slate-800']
                    )}
                >
                  {item.name}
                </div>
              </Link>
            ))
          }
        </aside>
      </div>
    </ScrollArea>
  )
}