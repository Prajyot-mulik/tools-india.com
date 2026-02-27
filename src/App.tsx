import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'  // ✅ correct
import Home from './pages/Home'
import GSTCalculator from './pages/tools/GSTCalculator'
import CGPACalculator from './pages/tools/CGPACalculator'
import AgeCalculator from './pages/tools/AgeCalculator'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/gst" element={<GSTCalculator />} />
        <Route path="/tools/cgpa" element={<CGPACalculator />} />
        <Route path="/tools/age" element={<AgeCalculator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App