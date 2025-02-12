import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type TableProps = ComponentPropsWithoutRef<'table'>

export const Table = ({ className, ...props }: TableProps) => (
  <div className={clsx('x:w-full x:overflow-auto')}>
    <table className={clsx('x:w-full', className)} {...props} />
  </div>
)
