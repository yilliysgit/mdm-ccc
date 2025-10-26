// sanity/lib/queries.ts
import { client } from './client'

export async function getNieuws() {
  const query = `*[_type == "nieuws"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    featured,
    author,
    tags,
    readTime,
    publishedAt
  }`
  
  return await client.fetch(query)
}

// ✅ Alleen featured artikelen
export async function getFeaturedNieuws() {
  const query = `*[_type == "nieuws" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    publishedAt
  }`
  
  return await client.fetch(query)
}

// ✅ Filter op categorie
export async function getNieuwsByCategory(category: string) {
  const query = `*[_type == "nieuws" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    publishedAt
  }`
  
  return await client.fetch(query, { category })
}

export async function getNieuwsItem(slug: string) {
  const query = `*[_type == "nieuws" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    seoDescription,
    mainImage,
    secondImage,
    gallery,
    body,
    category,
    author,
    tags,
    readTime,
    publishedAt,
    updatedAt,
    "relatedArticles": relatedArticles[]-> {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt
    }
  }`
  
  return await client.fetch(query, { slug })
}