import { iconIds } from '@/generated/icon-ids'
import { IconBrowser } from '@/components/icon-browser'

export function generateStaticParams() {
  return [{ slug: ['all'] }].concat(iconIds.map((id) => ({ slug: [id] })))
}

export default function IconPage({
  params
}: {
  params: { slug?: string[] }
}) {
  const id = params.slug?.[0] ?? 'all'
  return <IconBrowser id={id} />
}
