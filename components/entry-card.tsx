import { homePreviewSets } from "@/generated/home-previews"
import { preloadIconRoute } from "@/lib/icon-search"
import Link from "next/link"

export function EntryCard() {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full">
      {
        homePreviewSets.map(({ name, id, len, icons }) => (
          <Link
            className="flex flex-col gap-2 border rounded-md p-6 cursor-pointer hover:border-slate-50 transition-all"
            key={name}
            href={`/icons/${id}`}
            onMouseEnter={() => preloadIconRoute(id)}
            onFocus={() => preloadIconRoute(id)}
            onPointerDown={() => preloadIconRoute(id)}
          >
            <div className="text-xl from-neutral-600">{name}</div>
            <div className="text-sm text-primary/60">{len} icons</div>
            <div className="flex flex-1 gap-2">
              {
                icons.map((svg, i) => (
                  <div key={i} dangerouslySetInnerHTML={{ __html: svg }} />
                ))
              }
            </div>
          </Link>
        ))
      }
    </div>
  )
}