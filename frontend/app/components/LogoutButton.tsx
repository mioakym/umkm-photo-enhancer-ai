"use client";

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    router.refresh()
    router.push("/")
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-2 
                 text-gray-700 hover:bg-gray-100 rounded-lg transition"
    >
      <LogOut size={20} />
      <span className="text-sm font-medium">Logout</span>
    </button>
  )
}
