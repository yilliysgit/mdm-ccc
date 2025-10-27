// src/app/studio/[[...tool]]/page.tsx
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
          Run <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>npm run dev</code> locally to access the CMS.
        </p>
      </div>
    )
  }

  return null
}