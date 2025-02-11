import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TbodyProps = ComponentPropsWithoutRef<'tbody'>

export const Tbody = ({ className, ...props }: TbodyProps) => (
  <tbody className={clsx('x:font-mono x:text-sm', className)} {...props} />
)
