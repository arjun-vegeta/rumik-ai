import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "@/lib/auth"
import Navbar from "@/components/Navbar"
import Image from "next/image"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || "/";

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <Navbar />
      <div className="flex items-center justify-center pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Sign in with your Google account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: `${callbackUrl}?toast=login` })
            }}
          >
            <Button 
              type="submit"
              className="w-full bg-black text-[#FFF4B3] hover:bg-[#fce4bd] hover:border-2 hover:border-black hover:text-black transition-all duration-300 border-2 border-black flex items-center justify-center gap-2 py-6"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
