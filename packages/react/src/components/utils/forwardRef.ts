import { forwardRef as fr } from 'react'

export function forwardRef<T>(render: T): T & { displayName?: string } {
  // @ts-ignore
  return fr(render)
}
