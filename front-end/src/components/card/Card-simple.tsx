import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type CardProps = {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  iconHeader?: LucideIcon;
  iconColor?: string;
}

export function Card({ title, children, footer, iconHeader: Icon, iconColor }: CardProps) {
  return (
    <div className="bg-white rounded-xl flex flex-col gap-2 px-6 py-4 hover:shadow-md hover:-translate-y-[1px] transition-all">
      {/* Header */}
      {title && (
        <div className="flex flex-row items-start justify-between gap-6">
          <h2 className="text-md font-semibold text-gray-600">
            {title}
          </h2>
          {
            Icon && (
              <div className={`${iconColor} p-3 rounded-lg`}>
                <Icon size={20}/>
              </div>

            )
          }
        </div>
      )}

      {/* Conteúdo */}
      <div className=" text-gray-700">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className=" bg-gray-50 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  )
}
