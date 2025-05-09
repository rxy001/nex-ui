import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TbodyProps = ComponentPropsWithoutRef<'tbody'>

export const Tbody = ({ className, ...props }: TbodyProps) => (
  <tbody
    className={clsx(
      'x:font-mono x:text-sm x:*:hover:bg-gray-100 x:dark:*:hover:bg-gray-900',
      className,
    )}
    {...props}
  />
)
