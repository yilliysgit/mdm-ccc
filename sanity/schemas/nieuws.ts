import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'nieuws',
  title: 'Nieuws',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Titel', 
      type: 'string', 
      validation: r => r.required() 
    }),
    defineField({ 
      name: 'slug',  
      title: 'Slug',  
      type: 'slug', 
      options: { source: 'title' },
      validation: r => r.required()
    }),
    
    // ✅ CATEGORIE - voor filtering
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: 'Rally', value: 'rally' },
          { title: 'Evenement', value: 'evenement' },
          { title: 'Achtergrond', value: 'achtergrond' },
          { title: 'Clubnieuws', value: 'clubnieuws' },
          { title: 'Interview', value: 'interview' },
        ]
      }
    }),
    
    // ✅ FEATURED - voor uitgelichte artikelen
    defineField({
      name: 'featured',
      title: 'Uitgelicht artikel',
      type: 'boolean',
      description: 'Toon dit artikel prominent op de homepage',
      initialValue: false
    }),
    
    // ✅ AUTEUR
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      initialValue: 'MDMCCC Redactie'
    }),
    
    defineField({ 
      name: 'excerpt', 
      title: 'Samenvatting', 
      type: 'text',
      rows: 3,
      validation: r => r.max(200).warning('Houd het onder 200 karakters voor beste weergave')
    }),
    
    // ✅ SEO BESCHRIJVING
    defineField({
      name: 'seoDescription',
      title: 'SEO Beschrijving',
      type: 'text',
      rows: 2,
      description: 'Voor Google resultaten (max 160 karakters)',
      validation: r => r.max(160)
    }),
    
    defineField({ 
      name: 'mainImage', 
      title: 'Hoofdafbeelding', 
      type: 'image', 
      options: { hotspot: true },
      validation: r => r.required()
    }),
    
    defineField({ 
      name: 'secondImage',
      title: 'Tweede afbeelding', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Optionele extra afbeelding voor in het artikel'
    }),
    
    // ✅ FOTO GALERIJ
    defineField({
      name: 'gallery',
      title: 'Foto Galerij',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'caption',
            type: 'string',
            title: 'Bijschrift'
          }
        ]
      }],
      options: {
        layout: 'grid'
      }
    }),
    
    defineField({ 
      name: 'body',  
      title: 'Inhoud', 
      type: 'array', 
      of: [{type: 'block'}] 
    }),
    
    // ✅ TAGS
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    
    // ✅ GERELATEERDE ARTIKELEN
    defineField({
      name: 'relatedArticles',
      title: 'Gerelateerde artikelen',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'nieuws'}]
      }],
      validation: r => r.max(3)
    }),
    
    // ✅ LEES TIJD (automatisch berekend)
    defineField({
      name: 'readTime',
      title: 'Leestijd (minuten)',
      type: 'number',
      description: 'Wordt automatisch berekend, of vul handmatig in'
    }),
    
    defineField({ 
      name: 'publishedAt', 
      title: 'Publicatiedatum', 
      type: 'datetime',
      validation: r => r.required()
    }),
    
    // ✅ UPDATE DATUM
    defineField({
      name: 'updatedAt',
      title: 'Laatst bijgewerkt',
      type: 'datetime',
      description: 'Wordt automatisch bijgewerkt bij wijzigingen'
    }),
  ],
  
  // ✅ PREVIEW in Sanity Studio
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
      date: 'publishedAt'
    },
    prepare({ title, media, category, date }) {
      return {
        title,
        media,
        subtitle: `${category || 'Geen categorie'} - ${date ? new Date(date).toLocaleDateString('nl-NL') : 'Niet gepubliceerd'}`
      }
    }
  }
})