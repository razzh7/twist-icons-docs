'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RaCheck, RaCopy } from "@/generated/chrome-icons"
import { cn } from '@/lib/utils'
import cpoy from 'copy-to-clipboard'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
}

export function CopyButton({
  value,
  className,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)
  const onCopy = () => {
    cpoy(value)
    setHasCopied(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
        className
      )}
      onClick={onCopy}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <RaCheck className="h-3 w-3" />
      ) : (
        <RaCopy className="h-3 w-3" />
      )}
    </Button>
  )
}
