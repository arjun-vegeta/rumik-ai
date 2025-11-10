import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { 
          candidates: {
            where: {
              status: {
                not: "withdrawn"
              }
            }
          }
        }
      }
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Job Postings</h2>
        <Link href="/admin/jobs/new">
          <Button className="bg-black text-[#FFF4B3] hover:bg-gray-800">
            Create New Job
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link href={`/admin/jobs/${job.id}/candidates`}>
                    <CardTitle className="text-xl hover:text-gray-600 cursor-pointer">
                      {job.title}
                    </CardTitle>
                  </Link>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={job.isActive ? "default" : "secondary"}>
                      {job.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Link href={`/admin/jobs/${job.id}/candidates`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                        {job._count.candidates} applicants
                      </Badge>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/admin/jobs/${job.id}/edit`}>
                    <Button variant="outline" size="sm" className="w-full">Edit</Button>
                  </Link>
                  <Link href={`/admin/jobs/${job.id}/candidates`}>
                    <Button variant="outline" size="sm" className="w-full">View Applicants</Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
