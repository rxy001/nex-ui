import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TheadProps = ComponentPropsWithoutRef<'thead'>

export function Thead({ className, ...props }: TheadProps) {
  return <thead className={clsx('x:font-semibold', className)} {...props} />
}
