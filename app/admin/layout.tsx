import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user || session.user.role !== "recruiter") {
    redirect("/")
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <h1 className="text-2xl font-bold">Recruiter Admin</h1>
            <nav className="flex gap-4">
              <Link href="/admin">
                <Button variant="ghost">Jobs</Button>
              </Link>
              <Link href="/admin/candidates">
                <Button variant="ghost">Candidates</Button>
              </Link>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <Button variant="ghost" type="submit">Logout</Button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
