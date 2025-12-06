import Link from "next/link"
import { ImageUp, Eraser, Palette } from "lucide-react"
import LogoutButton from "../components/LogoutButton"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">UMKM Photo AI</h1>
          <p className="text-sm text-gray-500 mt-1">Photo Enhancement Tools</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink 
            href="/upscale" 
            icon={<ImageUp size={20} />}
            label="Upscale Image"
            description="Tingkatkan resolusi foto"
          />
          
          <NavLink 
            href="/remove-bg" 
            icon={<Eraser size={20} />}
            label="Remove Background"
            description="Hapus latar belakang"
          />
          
          <NavLink 
            href="/color-correction" 
            icon={<Palette size={20} />}
            label="Color Correction"
            description="Perbaiki warna & cahaya"
          />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

function NavLink({ 
  href, 
  icon, 
  label, 
  description 
}: { 
  href: string
  icon: React.ReactNode
  label: string
  description: string
}) {
  return (
    <Link href={href}>
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer group">
        <div className="text-gray-600 group-hover:text-blue-600 mt-0.5">
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900 group-hover:text-blue-600">
            {label}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {description}
          </div>
        </div>
      </div>
    </Link>
  )
}