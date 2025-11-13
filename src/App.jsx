import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function Stat({ label, value, suffix }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}{suffix || ''}</div>
    </div>
  )
}

function App() {
  const [bor, setBor] = useState({ total_beds: 0, occupied: 0, bor: 0 })
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch(`${API}/test`).then(r => r.json()).then(setStatus).catch(()=>{})
    fetch(`${API}/dashboard/bor`).then(r => r.json()).then(setBor).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <header className="px-6 py-4 border-b bg-white/60 backdrop-blur sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">RS Rujukan Regional - Hospital 4.0</h1>
          <span className="text-sm text-gray-600">Backend: {status?.backend || '...'}</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Stat label="Total Bed" value={bor.total_beds} />
            <Stat label="Terisi" value={bor.occupied} />
            <Stat label="BOR" value={bor.bor?.toFixed?.(1) || 0} suffix="%" />
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-3">Quick Demo Actions</h3>
          <p className="text-sm text-gray-600 mb-4">Gunakan endpoint backend untuk membuat pasien, triage, admisi, dan validasi resep. UI ini menunjukkan ringkasan saja.</p>
          <ul className="text-sm list-disc pl-6 space-y-1 text-gray-700">
            <li>POST /patients</li>
            <li>POST /triage</li>
            <li>POST /admissions</li>
            <li>POST /procedures</li>
            <li>POST /pharmacy/validate</li>
            <li>GET /dashboard/bor</li>
          </ul>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">© {new Date().getFullYear()} RS XYZ</footer>
    </div>
  )
}

export default App
