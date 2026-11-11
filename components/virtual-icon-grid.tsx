'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import style from '@/app/icons/index.module.css'
import type { IconProps } from '@/types/icons'

const GAP = 0
const FALLBACK_ITEM = 36

interface VirtualIconGridProps {
  icons: IconProps[]
  onOpen: (icon: IconProps) => void
}

export function VirtualIconGrid({ icons, onOpen }: VirtualIconGridProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const sampleRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({
    width: 0,
    item: FALLBACK_ITEM,
    scrollMargin: 0
  })

  useLayoutEffect(() => {
    const node = listRef.current
    if (!node) return

    const measure = () => {
      const sample = sampleRef.current?.getBoundingClientRect()
      const item = sample && sample.width > 0 ? sample.width : FALLBACK_ITEM
      const width = node.clientWidth
      const scrollMargin = node.getBoundingClientRect().top + window.scrollY
      setMetrics((prev) => (
        prev.width === width && prev.item === item && prev.scrollMargin === scrollMargin
          ? prev
          : { width, item, scrollMargin }
      ))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const columns = metrics.width > 0
    ? Math.max(1, Math.floor((metrics.width + GAP) / (metrics.item + GAP)))
    : 1
  const rowCount = Math.ceil(icons.length / columns)

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => metrics.item,
    overscan: 5,
    scrollMargin: metrics.scrollMargin,
    gap: GAP,
    getItemKey: (index) => {
      const icon = icons[index * columns]
      return icon ? `${icon.prefix}:${icon.name}` : index
    }
  })

  const rows = virtualizer.getVirtualItems()

  return (
    <div ref={listRef} className="relative w-full">
      <div
        ref={sampleRef}
        aria-hidden
        className={`${style['icon-item']} pointer-events-none invisible absolute box-border flex items-center justify-center p-2 text-xl`}
      >
        <svg width="1em" height="1em" />
      </div>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {rows.map((virtualRow) => {
          const start = virtualRow.index * columns
          const row = icons.slice(start, start + columns)
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className="absolute left-0 top-0 flex w-full justify-center"
              style={{
                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`
              }}
            >
              {row.map((icon) => (
                <div
                  key={`${icon.prefix}-${icon.name}`}
                  className={`${style['icon-item']} box-border flex cursor-pointer items-center justify-center p-2 text-xl transition-all`}
                  onClick={() => onOpen(icon)}
                >
                  <icon.Icon />
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
