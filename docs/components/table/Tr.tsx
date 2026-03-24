import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TrProps = ComponentPropsWithoutRef<'tr'>

export function Tr({ className, ...props }: TrProps) {
  return (
    <tr
      className={clsx(
        'x:border-b x:text-left x:border-gray-200 x:dark:border-gray-800 x:transition-colors',
        className,
      )}
      {...props}
    />
  )
}
