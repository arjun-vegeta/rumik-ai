import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import JobForm from "@/components/JobForm"

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
  })

  if (!job) {
    notFound()
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Edit Job</h2>
      <JobForm job={job} />
    </div>
  )
}
