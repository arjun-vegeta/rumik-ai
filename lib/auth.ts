import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
        const role = adminEmails.includes(user.email) ? 'recruiter' : 'applicant'
        
        await prisma.user.upsert({
          where: { email: user.email },
          update: { 
            name: user.name,
            googleId: account.providerAccountId,
          },
          create: {
            email: user.email,
            name: user.name,
            googleId: account.providerAccountId,
            role,
          },
        })
      }
      return true
    },
    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        })
        if (dbUser) {
          session.user.id = dbUser.id
          session.user.role = dbUser.role
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})
