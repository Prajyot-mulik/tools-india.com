import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Tool {
  id: string
  name: string
  title: string
  description: string
  longDescription: string
  category: string
  path: string
  keywords: string[]
  icon: string
  badge?: string
}

const tools: Tool[] = [
  {
    id: 'age',
    name: 'Age Calculator',
    title: 'Precise Age Calculator',
    description: 'Instant age calculation with exact years, months & days',
    longDescription: 'Calculate your exact age instantly in years, months, days and total days. Perfect for finding someone\'s age, calculating days lived, or age verification. Works with any date of birth.',
    category: 'Personal',
    path: '/tools/age',
    icon: '📅',
    badge: 'Popular',
    keywords: [
      'age calculator', 'calculate age', 'age in years', 'birthday calculator',
      'how old am i calculator', 'date of birth calculator', 'age calculator online',
      'age calculator free', 'exact age calculator', 'age checker', 'birthday age calculator',
      'days lived calculator', 'age in days', 'age calculator india', 'age compute online'
    ]
  },
  {
    id: 'cgpa',
    name: 'CGPA to Percentage',
    title: 'CGPA to Percentage Converter',
    description: 'Convert CGPA to percentage for all Indian universities',
    longDescription: 'Convert your CGPA to percentage instantly for VTU, Anna University, AKTU, PTU and other Indian universities. Supports multiple university grading systems. Essential tool for students for admission, job applications and higher education.',
    category: 'Education',
    path: '/tools/cgpa',
    icon: '🎓',
    badge: 'Must Use',
    keywords: [
      'cgpa calculator', 'cgpa to percentage', 'gpa converter', 'university cgpa converter',
      'vtu cgpa calculator', 'anna university cgpa', 'aktu cgpa calculator', 'cgpa to marks',
      'how to calculate percentage from cgpa', 'cgpa calculation', 'college gpa calculator',
      'cgpa percentage conversion', 'academic calculator india', 'student calculator',
      'admission calculator', 'cgpa india', 'percentage calculator university'
    ]
  },
  {
    id: 'gst',
    name: 'GST Calculator India',
    title: 'GST Tax Calculator',
    description: 'Calculate GST and final price with 5%, 12%, 18%, 28% rates',
    longDescription: 'Quick GST calculator for Indian businesses and consumers. Calculate GST amount, tax rate and final price. Supports 5%, 12%, 18%, and 28% GST rates. Essential for billing, invoicing and tax calculation.',
    category: 'Business',
    path: '/tools/gst',
    icon: '💰',
    badge: 'Business',
    keywords: [
      'gst calculator', 'gst calculator india', 'goods and services tax calculator',
      'tax calculator india', 'gst rate calculator', 'invoice calculator',
      'business tax calculator', 'price with gst', 'gst computation', 'tax calculation online',
      'gst 5% calculator', 'gst 18% calculator', 'sales tax calculator india',
      'billing calculator', 'gst tax rate', 'indian tax calculator', 'business calculator'
    ]
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    title: 'Loan EMI Calculator',
    description: 'Calculate monthly EMI, total interest and repayment amount',
    longDescription: 'Calculate loan EMI instantly for home loans, car loans, personal loans and more. Get monthly EMI, total interest payable, total amount and complete amortization schedule. Trusted financial planning tool.',
    category: 'Finance',
    path: '/tools/emi',
    icon: '🏦',
    badge: 'Popular',
    keywords: [
      'emi calculator', 'loan calculator', 'emi calculator india', 'home loan calculator',
      'car loan calculator', 'personal loan calculator', 'loan emi calculator online',
      'monthly installment calculator', 'interest calculator', 'loan repayment calculator',
      'auto loan calculator', 'mortgage calculator', 'emi calculation formula',
      'total interest calculator', 'loan amount calculator', 'financial calculator india'
    ]
  }
]

export default function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Personal', 'Education', 'Business', 'Finance']

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                          tool.description.toLowerCase().includes(search.toLowerCase()) ||
                          tool.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f23', color: '#e0e0e0' }}>
      {/* Hero Section - Professional Dark Theme */}
      <div style={{ padding: '80px 20px 60px', textAlign: 'center', background: '#0f0f23', borderBottom: '1px solid #2a2a3e' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', margin: '20px 0 15px', color: '#ffffff', letterSpacing: '-1px' }}>
            toolfree
          </h1>
          <p style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#b0b0cc', fontWeight: '300' }}>
            All-in-One Smart Tools to Simplify Your Daily Tasks
          </p>
          <p style={{ fontSize: '1rem', color: '#888899', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
            enjoy our free unlimited online tools 
          </p>

          {/* Search Bar */}
          <div style={{ marginBottom: '40px' }}>
            <input
              type="text"
              placeholder="🔍 Search tools you want..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '600px',
                padding: '16px 24px',
                fontSize: '1rem',
                border: '1px solid #2a2a3e',
                borderRadius: '8px',
                background: '#1a1a2e',
                color: '#e0e0e0',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.2)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#2a2a3e'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ padding: '35px 20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '11px 24px',
              borderRadius: '6px',
              border: selectedCategory === cat ? '2px solid #667eea' : '1px solid #2a2a3e',
              background: selectedCategory === cat ? '#667eea' : '#1a1a2e',
              color: selectedCategory === cat ? '#ffffff' : '#b0b0cc',
              fontWeight: selectedCategory === cat ? '600' : '500',
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Currently Offering Section */}
      {search === '' && selectedCategory === 'All' && (
        <div style={{ padding: '0 20px 50px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '8px', padding: '40px 30px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '15px', fontWeight: '700' }}>
              ⭐ Currently Offering
            </h2>
            <p style={{ color: '#b0b0cc', fontSize: '1rem', marginBottom: '25px' }}>
              Powerful calculators trusted by students, professionals, and businesses across India
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {tools.slice(0, 4).map(tool => (
                <div
                  key={tool.id}
                  onClick={() => navigate(tool.path)}
                  style={{
                    background: '#0f0f23',
                    border: '1px solid #2a2a3e',
                    borderRadius: '6px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#667eea'
                    e.currentTarget.style.background = '#151530'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a3e'
                    e.currentTarget.style.background = '#0f0f23'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{tool.icon}</div>
                  <h3 style={{ color: '#ffffff', marginBottom: '8px', fontWeight: '600' }}>{tool.title}</h3>
                  {tool.badge && (
                    <span style={{ background: '#667eea', color: '#ffffff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                      {tool.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <div style={{ padding: '30px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        {filteredTools.length > 0 ? (
          <>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '30px', fontWeight: '700' }}>
              {search ? `Search Results (${filteredTools.length})` : 'All Tools'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '25px'
            }}>
              {filteredTools.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => navigate(tool.path)}
                  style={{
                    background: '#1a1a2e',
                    borderRadius: '8px',
                    padding: '28px 24px',
                    border: '1px solid #2a2a3e',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.borderColor = '#667eea'
                    e.currentTarget.style.background = '#202038'
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#2a2a3e'
                    e.currentTarget.style.background = '#1a1a2e'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span style={{ fontSize: '3rem', marginBottom: '18px', display: 'block' }}>
                    {tool.icon}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: '#ffffff', margin: '12px 0', fontWeight: '700' }}>
                    {tool.title}
                  </h3>
                  <p style={{ color: '#b0b0cc', marginBottom: '16px', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {tool.longDescription}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{
                      background: '#667eea',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {tool.category}
                    </span>
                    {tool.badge && (
                      <span style={{
                        background: '#2a2a3e',
                        color: '#667eea',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontSize: '1.2rem', color: '#b0b0cc' }}>No tools found matching your search. 🔍</p>
            <button
              onClick={() => {
                setSearch('')
                setSelectedCategory('All')
              }}
              style={{
                marginTop: '20px',
                padding: '12px 28px',
                background: '#667eea',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#7a8ff5'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#667eea'
              }}
            >
              View All Tools
            </button>
          </div>
        )}
      </div>

      {/* Contact Section with LinkedIn */}
      <div style={{ background: '#1a1a2e', borderTop: '1px solid #2a2a3e', padding: '50px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '20px', fontWeight: '700' }}>
            Connect With Me
          </h2>
          <p style={{ color: '#b0b0cc', marginBottom: '30px', fontSize: '1.05rem' }}>
            Have feedback or want to collaborate?  Reach out on LinkedIn or GitHub
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.linkedin.com/in/prajyot-mulik-431a2a248/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 28px',
                background: '#667eea',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#7a8ff5'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#667eea'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🔗</span>
              LinkedIn Profile
            </a>
            <a
              href="https://github.com/Prajyot-mulik"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 28px',
                background: '#2a2a3e',
                color: '#b0b0cc',
                textDecoration: 'none',
                border: '1px solid #3a3a4e',
                borderRadius: '6px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#667eea'
                e.currentTarget.style.color = '#667eea'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#3a3a4e'
                e.currentTarget.style.color = '#b0b0cc'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>💻</span>
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0f0f23', borderTop: '1px solid #2a2a3e', padding: '40px 20px', textAlign: 'center', color: '#b0b0cc' }}>
        <p style={{ fontSize: '1rem', color: '#ffffff', fontWeight: '600', marginBottom: '12px' }}>
          🇮🇳 India Tools — Free Professional Calculators
        </p>
        <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
          Best calculators for CGPA, GST, EMI, Age & more | Indian students, professionals & businesses
        </p>
        <p style={{ fontSize: '0.85rem', color: '#888899' }}>
          © 2024 India Tools. All calculator tools are free to use online.
        </p>
      </div>
    </div>
  )
}