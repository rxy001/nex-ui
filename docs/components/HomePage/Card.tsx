import type { ReactNode } from 'react'

type CardProps = {
  title?: ReactNode
  icon?: ReactNode
  children?: ReactNode
}

export const Card = ({ children, icon, title }: CardProps) => {
  return (
    <div className="x:w-full x:rounded-2xl x:p-3 x:shadow-medium x:bg-white/5 x:dark:bg-default-400/10 x:backdrop-blur-lg x:backdrop-saturate-[1.8]">
      <div className="x:flex x:items-center x:gap-3">
        <div className="x:flex x:justify-center x:p-2 x:rounded-full x:items-center x:text-blue-500 x:bg-[#0f64ff40]">
          {icon}
        </div>
        <p className="x:text-lg x:font-semibold">{title}</p>
      </div>
      <p className="x:w-full x:place-content-inherith-auto x:break-words x:text-left x:overflow-y-auto x:subpixel-antialiased x:mt-3 x:text-gray-500">
        {children}
      </p>
    </div>
  )
}
