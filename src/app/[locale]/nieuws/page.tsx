// src/app/nieuws/page.tsx
import { Link } from '@/i18n/routing'
import Image from "next/image"
import Header from "../../components/layout/header/Header"
import { getNieuws } from "../../../../sanity/lib/queries"
import { urlFor } from "../../../../sanity/lib/image"

export default async function NieuwsPage() {
  const nieuwsItems = await getNieuws()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-stone-900">
              Nieuws
            </h1>

            {/* (optioneel) plek voor filters/search */}
            {/* <div className="w-full sm:w-80">
              <input className="w-full rounded-xl border border-stone-300 bg-white/70 px-4 py-2 outline-none ring-amber-500/30 focus:ring-4" placeholder="Zoek in nieuws…" />
            </div> */}
          </div>

          {/* empty state */}
          {!nieuwsItems?.length ? (
            <div className="rounded-2xl border border-stone-200 bg-white/70 p-10 text-center text-stone-600">
              Nog geen nieuwsberichten. Kom later terug!
            </div>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {nieuwsItems.map((item: any, idx: number) => {
                const href = `/nieuws/${item?.slug?.current ?? ""}`
                const img =
                  item?.mainImage
                    ? urlFor(item.mainImage)
                        .width(900) // voldoende groot voor 3-col
                        .height(600)
                        .fit("crop")
                        .auto("format")
                        .url()
                    : null

                const published = item?.publishedAt
                  ? new Intl.DateTimeFormat("nl-NL").format(new Date(item.publishedAt))
                  : null

                return (
                  <li key={item._id}>
                    <Link
                      href={href}
                      aria-label={`Lees: ${item?.title ?? "Nieuwsbericht"}`}
                      className="group block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/40"
                    >
                      {/* image */}
                      <div className="relative aspect-[3/2] overflow-hidden">
                        {img ? (
                          <Image
                            src={img}
                            alt={item.title || "Afbeelding"}
                            fill
                            priority={idx < 2}
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
                        )}

                        {/* gradient overlay for text contrast */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />

                        {/* badges */}
                        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
                          {item?.category && (
                            <span className="rounded-full bg-emerald-700/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
                              {item.category}
                            </span>
                          )}
                          {item?.featured && (
                            <span className="ml-auto rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
                              ⭐ Uitgelicht
                            </span>
                          )}
                        </div>
                      </div>

                      {/* content */}
                      <div className="p-6">
                        <h2 className="mb-2 line-clamp-2 text-2xl font-bold leading-snug text-stone-900 transition-colors group-hover:text-emerald-700">
                          {item.title}
                        </h2>

                        {item?.excerpt && (
                          <p className="line-clamp-3 text-stone-600">
                            {item.excerpt}
                          </p>
                        )}

                        <div className="mt-5 flex items-center justify-between text-sm text-stone-500">
                          <span className="font-medium">
                            {item?.author || "MDMCCC"}
                          </span>
                          <div className="flex items-center gap-3">
                            {!!item?.readTime && <span>📖 {item.readTime} min</span>}
                            {!!published && <time dateTime={item.publishedAt}>{published}</time>}
                          </div>
                        </div>

                        {/* tags */}
                        {!!item?.tags?.length && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.slice(0, 4).map((tag: string) => (
                              <span
                                key={tag}
                                className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </main>
    </>
  )
}
