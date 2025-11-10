import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CandidatesPage() {
  const candidates = await prisma.candidate.findMany({
    where: {
      status: {
        not: "withdrawn"
      }
    },
    orderBy: { createdAt: 'desc' },
    include: {
      job: true,
      user: true,
    },
  })

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">All Candidates</h2>

      <div className="grid gap-4">
        {candidates.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No applications yet.</p>
        ) : (
          candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{candidate.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{candidate.job.title}</Badge>
                      <Badge variant="secondary">
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  <Link href={`/admin/candidates/${candidate.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {candidate.whyFit}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
