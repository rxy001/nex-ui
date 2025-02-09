import NextLink from 'next/link'
import type { LinkProps } from 'next/link'

export function Link(props: LinkProps) {
  return <NextLink className="x:text-[#006be6]" {...props} />
}
