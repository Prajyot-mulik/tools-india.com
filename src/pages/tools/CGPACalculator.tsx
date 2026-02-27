import { useState } from 'react'
import axios from 'axios'

interface CGPAResult {
  cgpa: number
  percentage: number
  university: string
}

export default function CGPACalculator() {
  const [cgpa, setCgpa] = useState('')
  const [university, setUniversity] = useState('default')
  const [result, setResult] = useState<CGPAResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = async () => {
    if (!cgpa) return
    setLoading(true)
    setError(null)
    try {
      console.log('🔵 Sending request to /api/cgpa')
      const res = await axios.post('/api/cgpa', {
        cgpa: parseFloat(cgpa),
        university
      })
      console.log('✅ Got response:', res.data)
      if (res.data.error) {
        setError(res.data.error)
      } else {
        setResult(res.data)
      }
    } catch (err: any) {
      console.error('❌ Request failed:', err.message)
      setError('Failed to connect. Make sure API server is running on port 8000.')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '560px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '1.8rem', color: '#1e293b' }}>CGPA to Percentage Calculator</h1>
      <p style={{ color: '#64748b', margin: '8px 0 28px' }}>
        Convert your CGPA to percentage for all Indian universities
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Your CGPA</label>
        <input
          type="number"
          step="0.01"
          value={cgpa}
          onChange={e => setCgpa(e.target.value)}
          placeholder="e.g. 8.5"
          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Select University</label>
        <select
          value={university}
          onChange={e => setUniversity(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
        >
          <option value="default">General Formula (×9.5)</option>
          <option value="VTU">VTU (×10)</option>
          <option value="Mumbai">Mumbai University</option>
          <option value="Anna">Anna University</option>
          <option value="AKTU">AKTU</option>
          <option value="PTU">PTU</option>
        </select>
      </div>

      <button onClick={calculate} disabled={loading} style={{
        width: '100%', padding: '14px', background: loading ? '#93c5fd' : '#2563eb',
        color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600'
      }}>
        {loading ? 'Converting...' : 'Convert to Percentage'}
      </button>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '0.9rem' }}>
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginTop: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <p style={{ color: '#64748b' }}>Your Percentage</p>
          <h2 style={{ fontSize: '3rem', color: '#2563eb', margin: '10px 0' }}>
            {result.percentage}%
          </h2>
          <p style={{ color: '#94a3b8' }}>CGPA: {result.cgpa} | {result.university}</p>
        </div>
      )}
    </div>
  )
}