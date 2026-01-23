import { LogOut, MessageCircle, User, Volleyball } from "lucide-react"
import { Megaphone } from 'lucide-react'
type HeaderProps = {
  companyName: string
  onLogout: () => void
}

export function Header({ companyName, onLogout }: HeaderProps) {
  const menus_selecao = [
    "campanhas",
    "mensagens",
    "receptores"
  ] as const;
  const dictionaty = {
    "campanhas": "Campaigns",
    "mensagens": "Messages",
    "receptores": "Receptors"
  }

  /**fixed md:static
  inset-y-0 left-0
  z-50
  w-64
  */

  return (
    <aside className="
    fixed md:static
      h-screen w-64
      flex flex-col justify-between
      bg-gray-50 
      px-6 py-10
      rounded-br-xl
      rounded-tr-xl
      transform
      transition-transform
      -translate-x-full md:translate-x-0 
      z-50
    ">
      {/* Topo */}
      <div className="space-y-10">
        {/* Empresa */}
        <div className="flex flex-row items-center gap-3  font-bold tracking-wide text-gray-600 py-3 px-4 bg-white  rounded-xl">
          <span>
            <Volleyball size={30} color={'#4FD1C5'} />
          </span>
          <span className="text-xl ">
            {companyName}
          </span>
        </div>
      </div>

      <div>
        <nav>
          <ul className="space-y-4">
            {menus_selecao.map((menu) => (
              <li
                key={menu}
                onClick={() => { }}
                className="flex flex-row items-center gap-2 py-3 px-4 hover:bg-white focus:bg-white rounded-xl text-sm text-gray-600 ">
                <span className="p-2 bg-[#4FD1C5] rounded-lg">{menu === 'campanhas' ? <Megaphone size={18} color="#fff" /> : menu === 'mensagens' ? <MessageCircle size={18} color="#fff" /> : <User size={18} color="#fff" />}</span>
                <span>
                  {dictionaty[menu]}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <button
        type="button"
        title="logout"
        onClick={onLogout}
        className="
          flex items-center gap-2
          text-sm
          transition-colors
          py-3 px-4 hover:bg-white focus:bg-white rounded-xl
        "
      >
        <span className="p-2 bg-[#4FD1C5] rounded-lg text-gray-600">
          <LogOut size={18} color="#fff" />
        </span>
        Log out
      </button>
    </aside>
  )
}
