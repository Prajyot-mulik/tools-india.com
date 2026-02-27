import { useState } from 'react'
import axios from 'axios'

interface EMIResult {
  principal: number
  annual_rate: number
  tenure_months: number
  emi: number
  total_interest: number
  total_amount: number
}

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [tenureMonths, setTenureMonths] = useState('')
  const [result, setResult] = useState<EMIResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = async () => {
    if (!principal || !annualRate || !tenureMonths) return
    setLoading(true)
    setError(null)
    try {
      console.log('🔵 Sending request to /api/emi')
      const res = await axios.post('/api/emi', {
        principal: parseFloat(principal),
        annual_rate: parseFloat(annualRate),
        tenure_months: parseInt(tenureMonths)
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
      <h1 style={{ fontSize: '1.8rem', color: '#1e293b' }}>EMI Calculator</h1>
      <p style={{ color: '#64748b', margin: '8px 0 28px' }}>
        Calculate your loan EMI, interest, and total payable amount
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Loan Amount (₹)</label>
        <input
          type="number"
          value={principal}
          onChange={e => setPrincipal(e.target.value)}
          placeholder="e.g. 1000000"
          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Annual Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
          value={annualRate}
          onChange={e => setAnnualRate(e.target.value)}
          placeholder="e.g. 6.5"
          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Loan Tenure (Months)</label>
        <input
          type="number"
          value={tenureMonths}
          onChange={e => setTenureMonths(e.target.value)}
          placeholder="e.g. 240"
          style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
        />
      </div>

      <button onClick={calculate} disabled={loading} style={{
        width: '100%', padding: '14px', background: loading ? '#93c5fd' : '#2563eb',
        color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600'
      }}>
        {loading ? 'Calculating...' : 'Calculate EMI'}
      </button>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '0.9rem' }}>
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginTop: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: '16px' }}>Your EMI Breakdown</h2>
          {[
            { label: 'Monthly EMI', value: `₹${result.emi.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, highlight: true },
            { label: 'Total Interest Payable', value: `₹${result.total_interest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` },
            { label: 'Total Amount Payable', value: `₹${result.total_amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, highlight: true },
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
          <div style={{ marginTop: '16px', padding: '12px', background: '#eff6ff', borderRadius: '8px', fontSize: '0.9rem', color: '#1e40af' }}>
            Tenure: {result.tenure_months} months | Rate: {result.annual_rate}% per annum
          </div>
        </div>
      )}
    </div>
  )
}
