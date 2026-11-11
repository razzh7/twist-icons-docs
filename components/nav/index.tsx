import { Logo } from '@/components/logo'
import Link from 'next/link'
import { preloadIconRoute } from '@/lib/icon-search'
import { IconsNav } from './icons-nav'
// import style from './index.module.css'

export function Nav() {
  const links = [
    {
      name: 'Docs',
      path: '/docs'
    },
    {
      name: 'Icons',
      path: '/icons/all'
    },
    {
      name: 'Examples',
      path: '/examples'
    }
  ]

  return (
    // <header className={`${style.nav} flex items-center justify-center h-14 sticky top-0 z-50 bg-background/80`}>
    <header className='flex items-center justify-center h-14 sticky top-0 z-50 bg-background/80'>
      <nav className='flex justify-between container w-full'>
        <div className='flex items-center gap-6 text-sm'>
          <Logo />
          {
            links.map(({ name, path }) => (
              <Link
                href={path}
                key={name}
                onMouseEnter={path === '/icons/all' ? () => preloadIconRoute('all') : undefined}
                onFocus={path === '/icons/all' ? () => preloadIconRoute('all') : undefined}
                onPointerDown={path === '/icons/all' ? () => preloadIconRoute('all') : undefined}
              >
                <span className='transition-colors hover:text-foreground text-foreground/60'>{name}</span>
              </Link>
            ))
          }
        </div>
        <IconsNav />
      </nav>
    </header>
  )
}