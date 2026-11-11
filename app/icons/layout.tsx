'use client'
import { Suspense } from 'react'
import { IconSider } from '@/components/icon-sider'


interface IconsLayoutProps {
  children: React.ReactNode
}

export default function IconsLayout({ children }: IconsLayoutProps) {

  return (
    <div className="flex min-h-screen items-start">
      <div className="sticky top-0 h-screen shrink-0 self-start">
        <Suspense fallback={<div className="w-60 h-full border-r" />}>
          <IconSider />
        </Suspense>
      </div>
      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  )
}