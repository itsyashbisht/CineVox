'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [id, setId] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  
  const validate = (val) => /^tt\d{7,8}$/.test(val)
  
  const handleSubmit = () => {
    if (!id.trim()) { setError('Please enter an IMDb ID'); return }
    if (!validate(id.trim())) { setError('Invalid format. Use: tt followed by 7–8 digits'); return }
    setError('')
    router.push(`/movie/${id.trim()}`)
  }
  
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-3">
      <input
        type="text"
        value={id}
        onChange={(e) => { setId(e.target.value); setError('') }}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Enter IMDb ID (e.g., tt0111161)"
        className="w-full px-6 py-4 rounded-2xl bg-surface border border-border text-white placeholder-muted text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
      />
      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 px-8 py-4 bg-card hover:bg-surface border border-border rounded-2xl font-semibold text-white transition-all hover:border-accent/50 active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        Analyze Movie
      </button>
      <p className="text-muted text-sm">Format: tt followed by 7–8 digits</p>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}