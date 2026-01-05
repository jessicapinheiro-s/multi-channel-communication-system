type HeaderProps = {
  companyName: string
  userName: string
  onLogout: () => void
}

export function Header({ companyName, userName, onLogout }: HeaderProps) {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between bg-gray-900 text-white shadow-md">
      {/* Empresa */}
      <div className="text-lg font-bold tracking-wide">
        {companyName}
      </div>

      {/* Usuário */}
      <div className="text-sm text-gray-300">
        Olá, <span className="font-semibold text-white">{userName}</span>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="
          bg-red-600 hover:bg-red-700
          px-4 py-2 rounded
          text-sm font-semibold
          transition-colors
        "
      >
        Sair
      </button>
    </header>
  )
}
