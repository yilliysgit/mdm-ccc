import { getNieuwsItem } from '../../../../../sanity/lib/queries'
import { urlFor } from '../../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Header from '@/app/components/layout/header/Header'

export default async function NieuwsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // ← Await params!
  const artikel = await getNieuwsItem(slug)

  if (!artikel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artikel niet gevonden</h1>
          <Link href="/nieuws" className="text-green-700 hover:underline">
            ← Terug naar nieuws
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
    <Header />
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Hero met afbeelding */}
      {artikel.mainImage && (
        <div className="relative h-[60vh] w-full">
          <img
            src={urlFor(artikel.mainImage).width(1920).height(1080).url()}
            alt={artikel.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mx-auto max-w-4xl">
              <Link 
                href="/nieuws" 
                className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
              >
                ← Terug naar nieuws
              </Link>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                {artikel.title}
              </h1>
              {artikel.publishedAt && (
                <p className="text-white/80 text-lg">
                  {new Date(artikel.publishedAt).toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-16">
        {artikel.excerpt && (
          <p className="text-2xl text-stone-700 font-semibold mb-12 leading-relaxed">
            {artikel.excerpt}
          </p>
        )}

        {artikel.body && (
          <div className="prose prose-lg prose-stone max-w-none">
            <PortableText value={artikel.body} />
          </div>
        )}

        {/* Terug knop */}
        <div className="mt-16 pt-8 border-t border-stone-300">
          <Link 
            href="/nieuws"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-full font-bold transition-all"
          >
            ← Terug naar alle nieuws
          </Link>
        </div>
      </article>
    </main>
    </>
  )
}