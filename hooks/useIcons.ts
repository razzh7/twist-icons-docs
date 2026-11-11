import { useEffect, useRef, useState } from "react"
import { filterCategories } from "@/lib/twist-icons"
import { preloadIconRoute, resolveVisibleIcons } from "@/lib/icon-search"
import { useDebouncedCallback } from 'use-debounce'
import { usePathname, useRouter } from 'next/navigation'
import type { IconProps } from "@/types/icons"

export function useIcons(id: string) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [icons, setIcons] = useState<IconProps[]>([])
  const [total, setTotal] = useState(0)
  const [ready, setReady] = useState(false)
  const [max, setMax] = useState(200)
  const categories = filterCategories(id)
  const currentPath = pathname.split('/').pop()
  const seenId = useRef<string | null>(null)
  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setQuery(value)
  }, 300)

  if (typeof window !== 'undefined') {
    preloadIconRoute(id)
  }

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set('s', value)
    } else {
      params.delete('s')
    }
    const next = params.toString()
    router.replace(next ? `${pathname}?${next}` : pathname)
    debouncedSetQuery(value)
  }

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search).get('s') ?? ''
    debouncedSetQuery.cancel()
    setQuery(urlQuery)
    setInputValue(urlQuery)
  }, [id, debouncedSetQuery])

  useEffect(() => {
    let cancelled = false
    if (seenId.current !== id) {
      seenId.current = id
      setIcons([])
      setReady(false)
    }

    resolveVisibleIcons(id, query, max).then((result) => {
      if (cancelled) return
      setIcons(result.icons)
      setTotal(result.total)
      setReady(true)
    }).catch(() => {
      if (cancelled) return
      setIcons([])
      setTotal(0)
      setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [id, query, max])

  return {
    icons,
    total,
    ready,
    setIcons,
    max,
    setMax,
    categories,
    inputValue,
    handleSearch,
    currentPath
  }
}
