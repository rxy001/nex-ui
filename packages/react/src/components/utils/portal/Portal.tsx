'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { isFunction } from '@nex-ui/utils'
import type { PortalProps } from './types'

export const Portal = (props: PortalProps) => {
  const { children, container } = props
  const [mountNode, setMountNode] = useState<Element | null | undefined>(null)

  const onMount = useEvent(() => props.onMount?.())

  const onUnmount = useEvent(() => props.onUnmount?.())

  useEffect(() => {
    let node = container
    if (isFunction(node)) {
      node = node()
    }
    setMountNode(node || document.body)
  }, [container])

  useEffect(() => {
    if (mountNode) {
      onMount()

      return onUnmount
    }
  }, [mountNode, onMount, onUnmount])

  return mountNode ? createPortal(children, mountNode) : null
}

Portal.displayName = 'Portal'
