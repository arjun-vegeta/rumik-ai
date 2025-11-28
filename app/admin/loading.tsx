export default function AdminLoading() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
        <div>
          <div className="h-10 md:h-12 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-5 w-72 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-10 w-36 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="mb-4 md:mb-6">
        <div className="h-11 md:h-12 max-w-2xl bg-gray-100 rounded-lg animate-pulse" />
      </div>

      <div className="flex gap-2 mb-4 md:mb-6 border-b border-gray-200 pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <div className="h-5 flex-1 bg-gray-100 rounded animate-pulse" />
              <div className="h-6 w-16 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-12 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
