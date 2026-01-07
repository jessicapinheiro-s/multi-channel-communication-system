import { LogOut } from "lucide-react"

type HeaderProps = {
  companyName: string
  userName: string
  onLogout: () => void
}

export function Header({ companyName, userName, onLogout }: HeaderProps) {
  return (
    <header className="w-full h-16 py-10 px-14 flex items-center justify-between bg-white shadow-md">
      {/* Empresa */}
      <div className="text-lg font-bold tracking-wide">
        {companyName}
      </div>

      {/* Usuário */}
      <div className="text-sm text-gray-300">
        Olá, <span className="font-semibold text-gray-600">{userName}</span>
      </div>

      {/* Logout */}
      <button
        type="button"
        title="logout"
        onClick={onLogout}
        className="
          px-4 py-2 rounded
          text-sm font-semibold
          transition-colors
          hover:last:bg-gray-200
        "
      >
        <LogOut size={20} />
      </button>
    </header>
  )
}
