import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TdProps = ComponentPropsWithoutRef<'td'>

export function Td({ className, ...props }: TdProps) {
  return <td className={clsx('x:py-5 x:pr-4 x:pl-2', className)} {...props} />
}
