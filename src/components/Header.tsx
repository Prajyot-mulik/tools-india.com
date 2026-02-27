import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      padding: '15px 20px',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: '#fff'
        }}>
          <span style={{ fontSize: '2rem' }}>🇮🇳</span>
          <div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 'bold'
            }}>
              India Tools
            </div>
            <div style={{
              fontSize: '0.75rem',
              opacity: 0.9
            }}>
              Free Calculators & Tools
            </div>
          </div>
        </Link>

        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#about" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            opacity: 0.9,
            transition: 'opacity 0.3s'
          }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.9'}>
            About
          </a>
          <a href="#contact" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            opacity: 0.9,
            transition: 'opacity 0.3s'
          }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.9'}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
