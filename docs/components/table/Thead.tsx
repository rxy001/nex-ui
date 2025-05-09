import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TheadProps = ComponentPropsWithoutRef<'thead'>

export const Thead = ({ className, ...props }: TheadProps) => (
  <thead className={clsx('x:font-semibold', className)} {...props} />
)
