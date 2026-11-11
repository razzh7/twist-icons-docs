import { useEffect, useRef, useState } from "react"
import { filterCategories } from "@/lib/twist-icons"
import { resolveVisibleIcons } from "@/lib/icon-search"
import { useDebouncedCallback } from 'use-debounce'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import type { IconProps } from "@/types/icons"

export function useIcons(id: string) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('s') ?? ''
  const [query, setQuery] = useState(urlQuery)
  const [icons, setIcons] = useState<IconProps[]>([])
  const [total, setTotal] = useState(0)
  const [ready, setReady] = useState(false)
  const [max, setMax] = useState(200)
  const categories = filterCategories(id)
  const currentPath = pathname.split('/').pop()
  const seenId = useRef<string | null>(null)
  const urlQueryRef = useRef(urlQuery)
  urlQueryRef.current = urlQuery
  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setQuery(value)
  }, 300)

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
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
    debouncedSetQuery.cancel()
    setQuery(urlQueryRef.current)
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
    searchParams,
    handleSearch,
    currentPath
  }
}
