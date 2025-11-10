import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function JobCandidatesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      candidates: {
        where: {
          status: {
            not: "withdrawn"
          }
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
        },
      },
    },
  })

  if (!job) {
    notFound()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>
      case "in_review":
        return <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>
      case "selected":
        return <Badge className="bg-green-100 text-green-800">Selected</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div>
      <Link href="/admin" className="text-gray-600 hover:text-black mb-4 inline-block">
        ← Back to Jobs
      </Link>

      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <div className="flex gap-2 items-center">
          <Badge variant={job.isActive ? "default" : "secondary"}>
            {job.isActive ? "Active" : "Inactive"}
          </Badge>
          <Badge variant="outline">{job.candidates.length} applicants</Badge>
        </div>
      </div>

      {job.candidates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No applications yet for this position.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {job.candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{candidate.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>
                    <div className="flex gap-2 mt-2">
                      {getStatusBadge(candidate.status)}
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
                <div className="flex gap-4 mt-3 text-sm">
                  {candidate.portfolio && (
                    <a
                      href={candidate.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Portfolio ↗
                    </a>
                  )}
                  {candidate.linkedin && (
                    <a
                      href={candidate.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                  {candidate.github && (
                    <a
                      href={candidate.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub ↗
                    </a>
                  )}
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Resume ↗
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
