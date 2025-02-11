import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TrProps = ComponentPropsWithoutRef<'tr'>

export const Tr = ({ className, ...props }: TrProps) => (
  <tr
    className={clsx(
      'x:border-b x:text-left x:border-gray-200 x:dark:border-gray-600',
      className,
    )}
    {...props}
  />
)
