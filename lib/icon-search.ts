import type { IconType } from '@twistify/react-icons'
import type { IconProps } from '@/types/icons'
import { iconLoaders, type IconModule } from '@/generated/icon-loaders'

const moduleCache = new Map<string, Promise<IconModule>>()
let searchIndexPromise: Promise<Array<[string, string]>> | null = null

export function loadIconSet(id: string) {
  const cached = moduleCache.get(id)
  if (cached) return cached

  const loader = iconLoaders[id]
  if (!loader) return Promise.reject(new Error(`Unknown icon set: ${id}`))

  const pending = loader()
  moduleCache.set(id, pending)
  return pending
}

export function loadSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = fetch('/icon-search-index.json').then((response) => {
      if (!response.ok) throw new Error('Failed to load icon search index')
      return response.json() as Promise<Array<[string, string]>>
    })
  }
  return searchIndexPromise
}

function isIcon(value: unknown): value is IconType {
  return typeof value === 'function'
}

export async function resolveVisibleIcons(id: string, query: string, max: number) {
  const needle = query.trim().toLowerCase()

  if (id === 'all') {
    const index = await loadSearchIndex()
    const matched = needle
      ? index.filter(([, name]) => name.toLowerCase().includes(needle))
      : index
    const visible = matched.slice(0, max)
    const prefixes = Array.from(new Set(visible.map(([prefix]) => prefix)))
    const modules = new Map<string, IconModule>()
    await Promise.all(prefixes.map(async (prefix) => {
      modules.set(prefix, await loadIconSet(prefix))
    }))

    const icons: IconProps[] = []
    for (const [prefix, name] of visible) {
      const Icon = modules.get(prefix)?.[name]
      if (isIcon(Icon)) icons.push({ prefix, name, Icon })
    }
    return { icons, total: matched.length }
  }

  const iconsForSet = await loadIconSet(id)
  const matched: IconProps[] = []
  for (const name of Object.keys(iconsForSet)) {
    const Icon = iconsForSet[name]
    if (!isIcon(Icon)) continue
    if (needle && !name.toLowerCase().includes(needle)) continue
    matched.push({ prefix: id, name, Icon })
  }

  return { icons: matched.slice(0, max), total: matched.length }
}
