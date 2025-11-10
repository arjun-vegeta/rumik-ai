import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Careers</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-600 text-lg">
            We're looking for talented individuals to help us build the future.
          </p>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No open positions at the moment.</p>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-base">
                        {job.description.substring(0, 200)}...
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button className="bg-black text-[#FFF4B3] hover:bg-gray-800">
                      View Details & Apply
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
