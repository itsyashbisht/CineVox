export default function SkeletonLoader() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-20 px-4 animate-pulse">
      <div className="flex gap-8">
        <div className="w-64 h-96 rounded-2xl bg-surface flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-4 pt-4">
          <div className="h-8 w-2/3 rounded-lg bg-surface" />
          <div className="h-4 w-1/3 rounded-lg bg-surface" />
          <div className="h-4 w-full rounded-lg bg-surface mt-4" />
          <div className="h-4 w-5/6 rounded-lg bg-surface" />
          <div className="h-4 w-4/6 rounded-lg bg-surface" />
          <div className="flex gap-2 mt-6 flex-wrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-7 w-24 rounded-full bg-surface" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 h-40 rounded-2xl bg-surface" />
    </div>
  )
}