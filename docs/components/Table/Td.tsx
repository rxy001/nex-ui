import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TdProps = ComponentPropsWithoutRef<'td'>

export const Td = ({ className, ...props }: TdProps) => (
  <td className={clsx('x:py-5 x:pr-4 x:pl-2', className)} {...props} />
)
