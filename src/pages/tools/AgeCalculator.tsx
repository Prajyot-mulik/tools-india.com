import { useState } from 'react'
import axios from 'axios'

interface AgeResult {
  years: number
  months: number
  days: number
  total_days: number
}

export default function AgeCalculator() {
  const [dob, setDob] = useState('')
  const [result, setResult] = useState<AgeResult | null>(null)
  const [loading, setLoading] = useState(false)

  const calculate = async () => {
    if (!dob) return
    setLoading(true)
    try {
      console.log('🔵 Sending request to /api/age with dob:', dob)
      const res = await axios.post('/api/age', { dob })
      console.log('✅ Got response:', res.data)
      if (res.data.error) {
        console.error('❌ API returned error:', res.data.error)
        alert(res.data.error)
      } else {
        setResult(res.data)
      }
    } catch (err: any) {
      console.error('❌ Request failed:', err)
      console.error('Error details:', err.response?.data, err.message)
      alert('Failed to connect to API. Check browser console (F12) for details.')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '560px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '1.8rem', color: '#1e293b' }}>Age Calculator</h1>
      <p style={{ color: '#64748b', margin: '8px 0 28px' }}>Calculate your exact age in years, months and days</p>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
        />
      </div>

      <button onClick={calculate} disabled={loading} style={{
        width: '100%', padding: '14px', background: loading ? '#93c5fd' : '#2563eb',
        color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600'
      }}>
        {loading ? 'Calculating...' : 'Calculate Age'}
      </button>

      {result && (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginTop: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: '16px' }}>Your Age</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', textAlign: 'center' }}>
            {[
              { label: 'Years', value: result.years },
              { label: 'Months', value: result.months },
              { label: 'Days', value: result.days },
            ].map(item => (
              <div key={item.label} style={{ background: '#eff6ff', borderRadius: '8px', padding: '16px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>{item.value}</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.label}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '16px', color: '#94a3b8' }}>
            Total {result.total_days.toLocaleString()} days lived
          </p>
        </div>
      )}
    </div>
  )
}