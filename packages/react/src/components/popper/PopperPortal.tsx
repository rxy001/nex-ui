'use client'

import { Portal } from '@nex-ui/utils'
import { usePopperContext } from './PopperContext'
import type { PopperPortalProps } from './types'

export const PopperPortal = ({
  children,
  container,
  forceMount = false,
}: PopperPortalProps) => {
  const { open } = usePopperContext()

  return open || forceMount ? (
    <Portal container={container}>{children}</Portal>
  ) : null
}

PopperPortal.displayName = 'PopperPortal'
