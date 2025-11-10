"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { signIn } from "next-auth/react"

interface ApplyFormProps {
  job: {
    id: string
    title: string
    description: string
  }
  session: any
}

export default function ApplyForm({ job, session }: ApplyFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to submit application")
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="mb-4 text-gray-700">Please sign in with Google to apply</p>
        <Button 
          onClick={() => signIn("google")}
          className="bg-black text-[#FFF4B3] hover:bg-gray-800"
        >
          Sign in with Google
        </Button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="bg-green-50 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-bold mb-2 text-green-800">Application Submitted!</h3>
        <p className="text-green-700">We'll review your application and get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="jobId" value={job.id} />
      
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" name="name" required defaultValue={session.user.name || ""} />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          defaultValue={session.user.email}
          readOnly
          className="bg-gray-50"
        />
      </div>

      <div>
        <Label htmlFor="contact">Phone Number *</Label>
        <Input id="contact" name="contact" type="tel" required />
      </div>

      <div>
        <Label htmlFor="resume">Resume (PDF) *</Label>
        <Input id="resume" name="resume" type="file" accept=".pdf" required />
      </div>

      <div>
        <Label htmlFor="whyFit">Why are you a good fit for this role? *</Label>
        <Textarea 
          id="whyFit" 
          name="whyFit" 
          required 
          rows={5}
          placeholder="Tell us about your experience and why you're interested in this position..."
        />
      </div>

      <div>
        <Label htmlFor="portfolio">Portfolio URL</Label>
        <Input id="portfolio" name="portfolio" type="url" placeholder="https://" />
      </div>

      <div>
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." />
      </div>

      <div>
        <Label htmlFor="github">GitHub Profile</Label>
        <Input id="github" name="github" type="url" placeholder="https://github.com/..." />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={loading}
        className="bg-black text-[#FFF4B3] hover:bg-gray-800 w-full"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
}
