import { useState } from 'react'
import axios from 'axios'

interface GSTResult {
  original: number
  gst_amount: number
  gst_rate: number
  total: number
}

export default function GSTCalculator() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('18')
  const [result, setResult] = useState<GSTResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = async () => {
    if (!amount) return
    setLoading(true)
    setError(null)
    try {
      console.log('🔵 Sending request to /api/gst')
      const res = await axios.post('/api/gst', {
        amount: parseFloat(amount),
        rate: parseFloat(rate)
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
      <h1 style={{ fontSize: '1.8rem', color: '#1e293b' }}>GST Calculator India</h1>
      <p style={{ color: '#64748b', margin: '8px 0 28px' }}>
        Calculate GST amount and total price instantly — free
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
          Enter Amount (₹)
        </label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="e.g. 1000"
          style={{
            width: '100%', padding: '12px',
            border: '2px solid #e2e8f0', borderRadius: '8px',
            fontSize: '1rem', outline: 'none'
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
          GST Rate
        </label>
        <select
          value={rate}
          onChange={e => setRate(e.target.value)}
          style={{
            width: '100%', padding: '12px',
            border: '2px solid #e2e8f0', borderRadius: '8px',
            fontSize: '1rem', outline: 'none'
          }}
        >
          <option value="5">5%</option>
          <option value="12">12%</option>
          <option value="18">18%</option>
          <option value="28">28%</option>
        </select>
      </div>

      <button
        onClick={calculate}
        disabled={loading}
        style={{
          width: '100%', padding: '14px',
          background: loading ? '#93c5fd' : '#2563eb',
          color: '#fff', border: 'none',
          borderRadius: '8px', fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: '600'
        }}
      >
        {loading ? 'Calculating...' : 'Calculate GST'}
      </button>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '0.9rem' }}>
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div style={{
          background: '#fff', borderRadius: '12px',
          padding: '24px', marginTop: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ marginBottom: '16px', color: '#1e293b' }}>Result</h2>
          {[
            { label: 'Original Amount', value: `₹${result.original}` },
            { label: `GST (${result.gst_rate}%)`, value: `₹${result.gst_amount}` },
            { label: 'Total Amount', value: `₹${result.total}`, highlight: true },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '12px 0', borderBottom: '1px solid #f1f5f9'
            }}>
              <span style={{ color: '#64748b' }}>{row.label}</span>
              <strong style={{ color: row.highlight ? '#2563eb' : '#1e293b', fontSize: row.highlight ? '1.1rem' : '1rem' }}>
                {row.value}
              </strong>
            </div>
          ))}
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: '40px', color: '#475569' }}>
        <h2>How to use GST Calculator?</h2>
        <p style={{ marginTop: '8px', lineHeight: '1.7' }}>
          Enter your original amount, select the GST rate (5%, 12%, 18% or 28%),
          and click Calculate. You'll instantly get the GST amount and total price.
        </p>
        <h2 style={{ marginTop: '20px' }}>GST Rates in India</h2>
        <p style={{ marginTop: '8px', lineHeight: '1.7' }}>
          India has 4 GST slabs — 5% for essential goods, 12% for standard goods,
          18% for most services, and 28% for luxury items.
        </p>
      </div>
    </div>
  )
}