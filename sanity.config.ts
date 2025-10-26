"use client"

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import nieuws from './sanity/schemas/nieuws'  // ← verander import

export default defineConfig({
  name: 'default',
  title: 'MDM CCC Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { 
    types: [nieuws]  // ← verander naar nieuws
  },
})