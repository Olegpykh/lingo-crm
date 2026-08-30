export default function GlobalNotFound() {
  return (
    <html>
      <body
        style={{
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif',
          backgroundColor: '#f8f9fc',
          color: '#1e1b2e',
        }}
      >
        <h1
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#4f46e5',
            margin: 0,
          }}
        >
          404
        </h1>
        <p style={{ fontSize: 20, fontWeight: 700, margin: '8px 0' }}>
          Page not found
        </p>
        <p style={{ color: '#6b7280', marginBottom: 24 }}>
          {"The page you're looking for doesn't exist."}
        </p>
        <a
          href="/de"
          style={{
            backgroundColor: '#4f46e5',
            color: 'white',
            padding: '10px 24px',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Go to homepage
        </a>
      </body>
    </html>
  );
}
