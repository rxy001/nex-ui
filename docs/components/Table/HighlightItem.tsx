import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type HighlightItemProps = ComponentPropsWithoutRef<'span'>

export const HighlightItem = ({
  className,
  children,
  ...props
}: HighlightItemProps) => (
  <span
    className={clsx(
      'x:bg-[#ebf5ff] x:inline-block x:px-1.5 x:rounded-sm x:text-gray-600 x:border x:border-[#cce5ffcc]',
      className,
    )}
    {...props}
  >
    {children}
  </span>
)
