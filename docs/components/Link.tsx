import Link from 'next/link'
import type { LinkProps } from 'next/link'

export default function MyLink(props: LinkProps) {
  return <Link className="link" {...props} />
}
