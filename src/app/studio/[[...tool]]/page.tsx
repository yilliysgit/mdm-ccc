// Sanity Studio - Only available in development
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  // Disable studio in production builds
  if (process.env.NODE_ENV === 'production') {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'system-ui'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Sanity Studio
        </h1>
        <p style={{ color: '#666', maxWidth: '600px' }}>
          Studio is only available in development mode.<br/>
          Run <code>npm run dev</code> locally to access the CMS.
        </p>
      </div>
    )
  }

  // Only in development - dynamically import
  try {
    const { NextStudio } = require('next-sanity/studio')
    const config = require('../../../../sanity.config.ts').default
    return <NextStudio config={config} />
  } catch (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Studio Error</h1>
        <p>Could not load Sanity Studio. Check your configuration.</p>
      </div>
    )
  }
}