import type { ReactNode } from 'react'

type CardProps = {
  title?: string
  children: ReactNode
  footer?: ReactNode
}

export function Card({ title, children, footer }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      {title && (
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {title}
          </h2>
        </div>
      )}

      {/* Conteúdo */}
      <div className="px-5 py-4 text-gray-700">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  )
}
