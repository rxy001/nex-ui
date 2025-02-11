import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type ThProps = ComponentPropsWithoutRef<'th'>

export const Th = ({ className, ...props }: ThProps) => (
  <th className={clsx('x:py-5 x:pr-5', className)} {...props} />
)
