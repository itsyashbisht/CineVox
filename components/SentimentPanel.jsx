const colors = {
  positive: { bg: 'bg-green-500/10', border: 'border-green-500/30', badge: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-400' },
  mixed:    { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-400' },
  negative: { bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-400 border-red-500/30', dot: 'bg-red-400' },
}

export default function SentimentPanel({ sentiment }) {
  const c = colors[sentiment.classification] || colors.mixed
  return (
    <div className={`rounded-2xl border p-6 ${c.bg} ${c.border}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">🤖 AI Sentiment Analysis</h3>
        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${c.badge}`}>
          <span className={`w-2 h-2 rounded-full ${c.dot}`} />
          {sentiment.classification.charAt(0).toUpperCase() + sentiment.classification.slice(1)}
        </span>
      </div>
      <p className="text-muted leading-relaxed">{sentiment.summary}</p>
    </div>
  )
}