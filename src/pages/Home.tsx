import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Tool {
  id: string
  name: string
  description: string
  category: string
  path: string
  keywords: string[]
  icon: string
}

const tools: Tool[] = [
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months and days',
    category: 'Personal',
    path: '/tools/age',
    icon: '📅',
    keywords: ['age calculator', 'birthday', 'date of birth', 'age in years', 'age calculator online', 'calculate age', 'age calculator india']
  },
  {
    id: 'cgpa',
    name: 'CGPA to Percentage',
    description: 'Convert CGPA to percentage for Indian universities',
    category: 'Education',
    path: '/tools/cgpa',
    icon: '🎓',
    keywords: ['cgpa calculator', 'gpa to percentage', 'university cgpa', 'college cgpa', 'academic calculator', 'convertcgpa', 'vtu cgpa', 'anna university']
  },
  {
    id: 'gst',
    name: 'GST Calculator India',
    description: 'Calculate GST and total price instantly',
    category: 'Business',
    path: '/tools/gst',
    icon: '💰',
    keywords: ['gst calculator', 'gst calculator india', 'goods and services tax', 'tax calculator', 'business tax', 'gst rate', 'indian tax']
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'Calculate loan EMI, interest and total amount payable',
    category: 'Finance',
    path: '/tools/emi',
    icon: '🏦',
    keywords: ['emi calculator', 'loan calculator', 'emi calculator india', 'home loan calculator', 'monthly installment', 'personal loan', 'car loan']
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Hero Section */}
      <div style={{ padding: '60px 20px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '20px 0', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            🇮🇳 India Tools
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: 0.95 }}>
            Your all-in-one calculator for education, finance, personal & business needs
          </p>

          {/* Search Bar */}
          <div style={{ marginBottom: '40px' }}>
            <input
              type="text"
              placeholder="🔍 Search calculators... (age, cgpa, gst, emi)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '16px 20px',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '50px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              background: selectedCategory === cat ? '#fff' : 'rgba(255,255,255,0.3)',
              color: selectedCategory === cat ? '#667eea' : '#fff',
              fontWeight: selectedCategory === cat ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <div
                key={tool.id}
                onClick={() => navigate(tool.path)}
                style={{
                  background: '#fff',
                  borderRadius: '15px',
                  padding: '30px 25px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'
                }}
              >
                <span style={{ fontSize: '2.5rem', marginBottom: '15px', display: 'block' }}>
                  {tool.icon}
                </span>
                <h2 style={{ fontSize: '1.5rem', color: '#1e293b', margin: '15px 0', fontWeight: 'bold' }}>
                  {tool.name}
                </h2>
                <p style={{ color: '#64748b', marginBottom: '15px', lineHeight: '1.6' }}>
                  {tool.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: '#eff6ff',
                    color: '#0369a1',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {tool.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#fff' }}>
              <p style={{ fontSize: '1.2rem' }}>No tools found. Try a different search! 🔍</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '30px 20px', textAlign: 'center', color: '#fff', marginTop: '60px' }}>
        <p>🇮🇳 India Tools — Free Online Calculators for Education, Finance & Business</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '10px' }}>
          Best calculators for CGPA, GST, EMI, Age & more | Indian students & professionals
        </p>
      </div>
    </div>
  )
}