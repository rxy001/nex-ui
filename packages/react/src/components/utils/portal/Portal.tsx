'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { isFunction } from '@nex-ui/utils'
import type { PortalProps } from './types'

export const Portal = (props: PortalProps) => {
  const { children, container } = props
  const [mountNode, setMountNode] = useState<Element | null | undefined>(null)

  useEffect(() => {
    let node = container
    if (isFunction(node)) {
      node = node()
    }
    setMountNode(node || document.body)
  }, [container])

  return mountNode ? createPortal(children, mountNode) : null
}

Portal.displayName = 'Portal'
