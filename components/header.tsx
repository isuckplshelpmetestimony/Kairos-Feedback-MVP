import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="relative z-10 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Kairos
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white/90 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/marketplace" className="text-white/90 hover:text-white transition-colors">
            Marketplace
          </Link>
          <Link href="/upload" className="text-white/90 hover:text-white transition-colors">
            Upload Tool
          </Link>
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
            Wishlist
          </Button>
          <Button className="bg-white/20 text-white hover:bg-white/30">Dashboard</Button>
        </nav>

        <Link href="/submit">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6">Submit Project</Button>
        </Link>
      </div>
    </header>
  )
}
