"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type ComponentProps, useTransition } from "react"

export default function InstantLink({ 
  href, 
  children, 
  ...props 
}: ComponentProps<typeof Link>) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    startTransition(() => {
      router.push(href.toString())
    })
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      prefetch={true}
      {...props}
    >
      {children}
    </Link>
  )
}
