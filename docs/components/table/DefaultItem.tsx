import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type DefaultItemProps = ComponentPropsWithoutRef<'span'>

export function DefaultItem({
  className,
  children,
  ...props
}: DefaultItemProps) {
  return (
    <span
      className={clsx(
        'x:bg-[#f6f7f8] x:inline-block x:px-1.5 x:rounded-sm x:text-gray-600 x:border x:border-[#dfe2e7] x:dark:bg-[#1a1e23] x:dark:border-[#3d47514d] x:dark:text-[#fff]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
