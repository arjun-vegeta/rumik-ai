import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { readFile } from "fs/promises"
import { join } from "path"

// Simple heuristic-based AI insight generator
// Replace this with actual LLM API call (OpenAI, Anthropic, etc.)
function generateInsight(jobJD: string, resumeText: string, skills: string[]) {
  const insights: string[] = []
  let score = 50 // Base score

  // Check for skill matches
  const resumeLower = resumeText.toLowerCase()
  const matchedSkills = skills.filter(skill => 
    resumeLower.includes(skill.toLowerCase())
  )
  
  if (matchedSkills.length > 0) {
    score += Math.min(30, matchedSkills.length * 10)
    insights.push(`Strong match: Found ${matchedSkills.length} required skills (${matchedSkills.join(', ')})`)
  } else {
    insights.push("Limited skill match in resume")
  }

  // Check resume length (experience indicator)
  if (resumeText.length > 2000) {
    score += 10
    insights.push("Extensive experience demonstrated in resume")
  } else if (resumeText.length < 500) {
    score -= 10
    insights.push("Resume appears brief, may need more detail")
  }

  // Check for keywords
  const keywords = ['experience', 'project', 'led', 'managed', 'developed', 'built']
  const keywordMatches = keywords.filter(kw => resumeLower.includes(kw))
  if (keywordMatches.length >= 4) {
    score += 10
    insights.push("Resume shows strong action-oriented language")
  }

  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score))

  return { score, insights }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { candidateId, jobId } = body

    if (!candidateId || !jobId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Fetch candidate and job data
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: { job: true },
    })

    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 })
    }

    const job = candidate.job

    // Extract resume text (in production, use PDF parser)
    let resumeText = candidate.resumeText || ""
    if (!resumeText) {
      try {
        const resumePath = join(process.cwd(), "public", candidate.resumeUrl)
        resumeText = `Resume file: ${candidate.resumeUrl}. In production, parse PDF content here.`
      } catch (err) {
        resumeText = "Resume text not available"
      }
    }

    // Generate AI insights
    const { score, insights } = generateInsight(
      job.description,
      resumeText + " " + candidate.whyFit,
      job.skills
    )

    // Store in database
    const aiInsight = await prisma.aIInsight.create({
      data: {
        candidateId,
        jobJD: job.description,
        resumeText,
        score,
        insights,
      },
    })

    return NextResponse.json({ score, insights })
  } catch (error) {
    console.error("AI insight error:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
