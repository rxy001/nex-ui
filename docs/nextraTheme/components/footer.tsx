import cn from 'clsx'
import type { ComponentProps, FC } from 'react'

export const Footer: FC<ComponentProps<'footer'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    children && (
      <footer
        className={cn(
          'x:mx-auto x:flex x:max-w-(--nextra-content-width) x:justify-center x:py-5 x:text-gray-600 x:dark:text-gray-400',
          'x:pl-[max(env(safe-area-inset-left),1.5rem)] x:pr-[max(env(safe-area-inset-right),1.5rem)]',
          className,
        )}
        {...props}
      >
        {children}
      </footer>
    )
  )
}
