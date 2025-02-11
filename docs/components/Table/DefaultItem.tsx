import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type DefaultItemProps = ComponentPropsWithoutRef<'span'>

export const DefaultItem = ({
  className,
  children,
  ...props
}: DefaultItemProps) => (
  <span
    className={clsx(
      'x:bg-[#f6f7f8] x:inline-block x:px-1.5 x:rounded-sm x:text-gray-600 x:border x:border-[#dfe2e7]',
      className,
    )}
    {...props}
  >
    {children}
  </span>
)
