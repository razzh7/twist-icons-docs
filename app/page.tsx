'use client'
import { Nav } from "@/components/nav"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AiGithubOutlined } from '@/generated/chrome-icons'
import { EntryCard } from "@/components/entry-card"
import { preloadIconRoute } from "@/lib/icon-search"

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="container pb-20">
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Choose your icons
          </h1>
          <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            Twist-Icons collection popular Icons provide React、Vue3 and Vue2 Icons component, you can easy use them with ES6 import.
          </span>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <Link
              href='/icons/all'
              onMouseEnter={() => preloadIconRoute('all')}
              onFocus={() => preloadIconRoute('all')}
              onPointerDown={() => preloadIconRoute('all')}
            >
              <Button>Get Started</Button>
            </Link>
            <Button variant='outline'>
              <AiGithubOutlined className="mr-2 h-4 w-4" />
              <a href='https://github.com/twist-space/twist-icons' target='_blank'>
                Github
              </a>
            </Button>
          </div>
        </section>
        <EntryCard />
      </div>
    </div>
  )
}
