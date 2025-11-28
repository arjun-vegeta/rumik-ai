export default function CandidatesLoading() {
  return (
    <div>
      <div className="mb-6 md:mb-8">
        <div className="h-10 md:h-12 w-56 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-5 w-64 bg-gray-100 rounded animate-pulse" />
      </div>

      <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="h-11 md:h-12 flex-1 md:max-w-2xl bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-11 md:h-12 w-full md:w-[250px] bg-gray-100 rounded-lg animate-pulse" />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-48 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
