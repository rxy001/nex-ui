import type { ReactNode } from 'react'

type CardProps = {
  title?: ReactNode
  icon?: ReactNode
  children?: ReactNode
}

export const Card = ({ children, icon, title }: CardProps) => {
  return (
    <div className="w-full rounded-2xl p-3 shadow-medium bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]">
      <div className="flex items-center gap-3">
        <div className="flex justify-center p-2 rounded-full items-center text-blue-500 bg-[#0f64ff40]">
          {icon}
        </div>
        <p className="text-lg font-semibold">{title}</p>
      </div>
      <p className="w-full place-content-inherith-auto break-words text-left overflow-y-auto subpixel-antialiased mt-3 text-gray-500">
        {children}
      </p>
    </div>
  )
}
