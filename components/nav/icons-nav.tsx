import { ModeToggle } from "@/components/mode-toggle"
import { TiLogoGithubFilled } from '@/generated/chrome-icons'
import { Button } from "@/components/ui/button"

export function IconsNav() {
  return (
    <nav>
      <ModeToggle />
      <Button variant="ghost" className="w-9 px-0 focus-visible:ring-0">
        <a target="_blank" href="https://github.com/twist-space/twist-icons">
          <TiLogoGithubFilled className="h-[1.2rem] w-[1.2rem]" />
        </a>
      </Button>
    </nav>
  )
}
